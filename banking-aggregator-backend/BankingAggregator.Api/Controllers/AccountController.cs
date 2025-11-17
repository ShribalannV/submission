using Microsoft.AspNetCore.Mvc;
using BankingAggregator.Api.Data;

using Microsoft.EntityFrameworkCore;

namespace BankingAggregator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AccountsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string? search, int page = 1, int pageSize = 10)
        {
            var query = _db.Accounts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(a => a.AccountNumber.Contains(search));

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(a => a.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new
                {
                    a.Id,
                    a.AccountNumber,
                    a.Balance,
                    a.IsClosed,
                    a.CreatedAt,
                    bankName = "",
                    branchName = ""
                })
                .ToListAsync();

            return Ok(new { items, total });
        }

        [HttpPost("{id}/deposit")]
        public async Task<IActionResult> Deposit(Guid id, [FromBody] AmountDto dto)
        {
            if (dto.Amount <= 0) return BadRequest("invalid amount");

            var acc = await _db.Accounts.FindAsync(id);
            if (acc == null) return NotFound();

            acc.Balance += dto.Amount;

            _db.Transactions.Add(new Transaction
            {
                AccountId = acc.Id,
                Type = "deposit",
                Amount = dto.Amount,
                Description = dto.Description
            });

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/withdraw")]
        public async Task<IActionResult> Withdraw(Guid id, [FromBody] AmountDto dto)
        {
            if (dto.Amount <= 0) return BadRequest("invalid amount");

            var acc = await _db.Accounts.FindAsync(id);
            if (acc == null) return NotFound();

            if (acc.Balance < dto.Amount)
                return BadRequest("insufficient funds");

            acc.Balance -= dto.Amount;

            _db.Transactions.Add(new Transaction
            {
                AccountId = acc.Id,
                Type = "withdraw",
                Amount = dto.Amount,
                Description = dto.Description
            });

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/transfer")]
        public async Task<IActionResult> Transfer(Guid id, [FromBody] TransferDto dto)
        {
            if (dto.Amount <= 0 || dto.ToAccountId == Guid.Empty)
                return BadRequest("invalid");

            if (dto.ToAccountId == id)
                return BadRequest("cannot transfer to same account");

            using var tx = await _db.Database.BeginTransactionAsync();

            var from = await _db.Accounts.FindAsync(id);
            var to = await _db.Accounts.FindAsync(dto.ToAccountId);

            if (from == null || to == null)
                return NotFound();

            if (from.Balance < dto.Amount)
                return BadRequest("insufficient funds");

            from.Balance -= dto.Amount;
            to.Balance += dto.Amount;

            _db.Transactions.Add(new Transaction
            {
                AccountId = from.Id,
                Type = "transfer-out",
                Amount = dto.Amount,
                CounterpartyAccountId = to.Id,
                Description = dto.Description
            });

            _db.Transactions.Add(new Transaction
            {
                AccountId = to.Id,
                Type = "transfer-in",
                Amount = dto.Amount,
                CounterpartyAccountId = from.Id,
                Description = dto.Description
            });

            await _db.SaveChangesAsync();
            await tx.CommitAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Close(Guid id)
        {
            var acc = await _db.Accounts.FindAsync(id);
            if (acc == null) return NotFound();

            acc.IsClosed = true;
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }

    public class AmountDto
    {
        public decimal Amount { get; set; }
        public string? Description { get; set; }
    }

    public class TransferDto
    {
        public Guid ToAccountId { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
    }
}
