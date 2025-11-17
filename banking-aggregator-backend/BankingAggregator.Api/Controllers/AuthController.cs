using Microsoft.AspNetCore.Mvc;

using BankingAggregator.Api.Data;

using BankingAggregator.Api.Models;

using Microsoft.EntityFrameworkCore;

namespace BankingAggregator.Api.Controllers

{

    [ApiController]

    [Route("api/[controller]")]

    public class AuthController : ControllerBase

    {

        private readonly AppDbContext _db;

        public AuthController(AppDbContext db) { _db = db; }

        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] LoginRequest req)

        {

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user == null) return Unauthorized(new { message = "Invalid credentials" });

            // demo password check: accept password "password"

            if (req.Password != "password") return Unauthorized(new { message = "Invalid credentials" });

            var accessToken = "demo-access-token";

            var refreshToken = Guid.NewGuid().ToString();

            _db.RefreshTokens.Add(new RefreshToken { UserId = user.Id, TokenHash = refreshToken, ExpiresAt = DateTime.UtcNow.AddDays(7) });

            await _db.SaveChangesAsync();

            return Ok(new { accessToken, refreshToken, user = new { user.Id, user.Email, user.FullName, user.Role } });

        }

        [HttpPost("refresh")]

        public async Task<IActionResult> Refresh([FromBody] RefreshRequest req)

        {

            var rt = await _db.RefreshTokens.FirstOrDefaultAsync(r => r.TokenHash == req.RefreshToken && !r.Revoked);

            if (rt == null || rt.ExpiresAt < DateTime.UtcNow) return Unauthorized();

            var newAccess = "demo-access-token";

            return Ok(new { accessToken = newAccess });

        }

        [HttpPost("logout")]

        public async Task<IActionResult> Logout([FromBody] LogoutRequest req)

        {

            var rt = await _db.RefreshTokens.FirstOrDefaultAsync(r => r.TokenHash == req.RefreshToken);

            if (rt != null) { rt.Revoked = true; await _db.SaveChangesAsync(); }

            return NoContent();

        }

    }

    public class LoginRequest { public string Email { get; set; } = ""; public string Password { get; set; } = ""; }

    public class RefreshRequest { public string RefreshToken { get; set; } = ""; }

    public class LogoutRequest { public string RefreshToken { get; set; } = ""; }

}

