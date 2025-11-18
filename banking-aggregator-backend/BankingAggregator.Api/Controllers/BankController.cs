//bankcontroller

using BankingAggregator.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankingAggregator.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]  // ONLY admins can use these APIs
    public class BankController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BankController(AppDbContext db)
        {
            _db = db;
        }

        // ============================================================
        // 1️⃣ CREATE BANK
        // ============================================================
        [HttpPost]
        public async Task<IActionResult> CreateBank([FromBody] CreateBankRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.BankName))
                return BadRequest(new { message = "Bank name cannot be empty" });

            var bank = new Bank
            {
                BankName = request.BankName
            };

            _db.Banks.Add(bank);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Bank created successfully",
                bank
            });
        }

        // ============================================================
        // 2️⃣ DELETE BANK
        // ============================================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBank(int id)
        {
            var bank = await _db.Banks
                                .Include(b => b.Branches)
                                .FirstOrDefaultAsync(b => b.Id == id);

            if (bank == null)
                return NotFound(new { message = "Bank not found" });

            if (bank.Branches != null && bank.Branches.Any())
                return BadRequest(new { message = "Cannot delete bank with associated branches" });

            _db.Banks.Remove(bank);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Bank deleted successfully" });
        }

        // ============================================================
        // 3️⃣ LIST ALL BANKS (Useful for Admin Dashboard)
        // ============================================================
        [HttpGet]
        public async Task<IActionResult> GetAllBanks()
        {
            var banks = await _db.Banks
                .Select(b => new { b.Id, b.BankName })
                .ToListAsync();

            return Ok(banks);
        }
    }

    // DTO for creating a bank
    public class CreateBankRequest
    {
        public string BankName { get; set; } = "";
    }
}