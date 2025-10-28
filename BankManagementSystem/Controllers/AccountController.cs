using BankManagementSystem.Data;
using BankManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            var user = await _context.Users.FindAsync(account.UserId);
            if (user == null)
                return NotFound("User not found.");

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Account created successfully!", AccountId = account.AccountId });
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _context.Accounts.Include(a => a.User).ToListAsync();
            return Ok(accounts);
        }

       
        [HttpPost("{accountId}/deposit")]
        public async Task<IActionResult> Deposit(int accountId, [FromQuery] decimal amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            if (amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            account.Balance += amount;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Deposit successful.", account.Balance });
        }

        
        [HttpPost("{accountId}/withdraw")]
        public async Task<IActionResult> Withdraw(int accountId, [FromQuery] decimal amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            if (amount <= 0)
                return BadRequest("Amount must be greater than zero.");

            if (account.Balance < amount)
                return BadRequest("Insufficient balance.");

            account.Balance -= amount;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Withdrawal successful.", account.Balance });
        }

        
        [HttpGet("{accountId}/balance")]
        public async Task<IActionResult> GetBalance(int accountId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound("Account not found.");

            return Ok(new { account.AccountNumber, account.Balance });
        }
    }
}
