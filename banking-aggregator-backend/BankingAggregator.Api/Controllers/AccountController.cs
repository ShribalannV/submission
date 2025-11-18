using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankingAggregator.Api.Data;
using BankingAggregator.Api.Models;
using System.Security.Claims;

namespace BankingAggregator.Api.Controllers
{
    [ApiController]
    [Authorize]   // user must be logged in
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AccountsController(AppDbContext db)
        {
            _db = db;
        }

        // ================================================================
        // 1️⃣ LIST ACCOUNTS — USER CAN ONLY SEE THEIR OWN ACCOUNTS
        // ================================================================
        [HttpGet]
        public async Task<IActionResult> GetMyAccounts()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var accounts = await _db.Accounts
                .Where(a => a.UserId.ToString() == userId)
                .Select(a => new
                {
                    a.Id,
                    a.AccountNumber,
                    a.Balance,
                    a.IsClosed,
                    a.CreatedAt
                })
                .ToListAsync();

            return Ok(accounts);
        }

        // ================================================================
        // 2️⃣ CREATE NEW ACCOUNT — ONLY ADMIN
        // ================================================================
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequest req)
        {
            var newAccount = new Account
            {
                Id = Guid.NewGuid(),
                AccountNumber = req.AccountNumber,
                Balance = req.InitialBalance,
                UserId = req.UserId,
                CreatedAt = DateTime.UtcNow
            };

            _db.Accounts.Add(newAccount);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Account created successfully",
                account = newAccount
            });
        }

        // ================================================================
        // 3️⃣ CLOSE ACCOUNT — ONLY ADMIN
        // ================================================================
        [HttpPost("{id}/close")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CloseAccount(Guid id)
        {
            var account = await _db.Accounts.FindAsync(id);

            if (account == null)
                return NotFound(new { message = "Account not found" });

            if (account.IsClosed)
                return BadRequest(new { message = "Account already closed" });

            account.IsClosed = true;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Account closed successfully" });
        }
    }

    // DTO for account creation
    public class CreateAccountRequest
    {
        public string AccountNumber { get; set; } = "";
        public decimal InitialBalance { get; set; }
        public Guid UserId { get; set; }
    }
}
