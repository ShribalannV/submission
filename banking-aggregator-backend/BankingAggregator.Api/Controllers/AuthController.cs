using BankingAggregator.Api.Data;
using BankingAggregator.Api.Models;
using BankingAggregator.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

namespace BankingAggregator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _db.Users
                .FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user == null || user.Password != req.Password)
                return Unauthorized(new { message = "Invalid credentials" });

            // Generate tokens
            var accessToken = _jwt.GenerateAccessToken(user);
            var refreshToken = _jwt.GenerateRefreshToken();

            // Save refresh token
            _db.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                IsRevoked = false
            });

            await _db.SaveChangesAsync();

            return Ok(new
            {
                accessToken,
                refreshToken,
                user = new
                {
                    user.Id,
                    user.Email,
                    user.FullName,
                    user.Role
                }
            });
        }

        // ================= REFRESH =================
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest req)
        {
            var rt = await _db.RefreshTokens
                .FirstOrDefaultAsync(r => r.Token == req.RefreshToken && !r.IsRevoked);

            if (rt == null || rt.ExpiresAt < DateTime.UtcNow)
                return Unauthorized(new { message = "Invalid or expired refresh token" });

            var user = await _db.Users.FindAsync(rt.UserId);
            if (user == null)
                return Unauthorized();

            var newAccessToken = _jwt.GenerateAccessToken(user);

            return Ok(new { accessToken = newAccessToken });
        }

        // ================= VERIFY (Protected) =================
        [Authorize]
        [HttpGet("verify")]
        public IActionResult Verify()
        {
            return Ok(new
            {
                message = "Token is valid",
                user = new
                {
                    Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                    Email = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value,
                    Role = User.FindFirst("role")?.Value
                }
            });
        }

        // ================= LOGOUT =================
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest req)
        {
            var rt = await _db.RefreshTokens
                .FirstOrDefaultAsync(r => r.Token == req.RefreshToken);

            if (rt != null)
            {
                rt.IsRevoked = true;
                await _db.SaveChangesAsync();
            }

            return NoContent();
        }
    }

    // ================= DTOs =================
    public class LoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RefreshRequest
    {
        public string RefreshToken { get; set; } = "";
    }

    public class LogoutRequest
    {
        public string RefreshToken { get; set; } = "";
    }
}
