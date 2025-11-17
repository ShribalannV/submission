using Microsoft.AspNetCore.Mvc;

using BankingAggregator.Api.Data;

using Microsoft.EntityFrameworkCore;

namespace BankingAggregator.Api.Controllers

{

    [ApiController]

    [Route("api/[controller]")]

    public class TransactionsController : ControllerBase

    {

        private readonly AppDbContext _db;

        public TransactionsController(AppDbContext db) { _db = db; }

        [HttpGet]

        public async Task<IActionResult> List([FromQuery] int page = 1, [FromQuery] int pageSize = 10)

        {

            var q = _db.Transactions.OrderByDescending(t => t.CreatedAt);

            var total = await q.CountAsync();

            var items = await q.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { items, total });

        }

    }

}

