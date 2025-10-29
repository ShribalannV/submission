using Microsoft.AspNetCore.Mvc;
using BankEmployeeAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

namespace BankEmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private static List<BankEmployee>? _employees;
        private static readonly string SecretKey = "ThisIsASecretKeyForJWTGeneration123!"; // keep secret in real apps

        // GET: api/employee/generate
        [HttpGet("generate")]
        public IActionResult GenerateEmployees()
        {
            var random = new Random();

            var roles = Enumerable.Range(1, 10).Select(i => $"Role{i}").ToList();
            var banks = new List<string>
            {
                "HDFC Bank", "ICICI Bank", "SBI Bank", "Axis Bank", "Canara Bank",
                "Union Bank", "PNB Bank", "Bank of Baroda", "Yes Bank", "Kotak Bank"
            };

            _employees = new List<BankEmployee>();

            for (int i = 1; i <= 100; i++)
            {
                var emp = new BankEmployee
                {
                    Id = i,
                    FullName = $"Employee_{i}",
                    Role = roles[random.Next(roles.Count)],
                    BankName = banks[random.Next(banks.Count)]
                };
                _employees.Add(emp);
            }

            // Assign special roles
            AssignSpecialRoles(new[] { 3, 5, 97, 100 }, new[] { "Role5", "Role7" });

            // Generate tokens
            foreach (var emp in _employees)
                emp.Token = GenerateJwtToken(emp);

            // Save to JSON
            var json = JsonSerializer.Serialize(_employees, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText("employees.json", json);

            return Ok(new { message = "Employees generated successfully", count = _employees.Count });
        }

        // GET: api/employee/list
        [HttpGet("list")]
        public IActionResult GetAllEmployees()
        {
            if (_employees == null || !_employees.Any())
                return BadRequest("No employees generated yet. Call /api/employee/generate first.");
            return Ok(_employees);
        }

        // GET: api/employee/{id}
        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var emp = _employees?.FirstOrDefault(e => e.Id == id);
            if (emp == null)
                return NotFound($"Employee with ID {id} not found.");
            return Ok(emp);
        }

        // GET: api/employee/bybank/{bankName}
        [HttpGet("bybank/{bankName}")]
        public IActionResult GetByBank(string bankName)
        {
            if (_employees == null) return BadRequest("No employees generated yet.");
            var list = _employees.Where(e => string.Equals(e.BankName, bankName, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(list);
        }

        // GET: api/employee/byrole/{roleName}
        [HttpGet("byrole/{roleName}")]
        public IActionResult GetByRole(string roleName)
        {
            if (_employees == null) return BadRequest("No employees generated yet.");
            var list = _employees.Where(e => e.Role.Split(',').Select(r => r.Trim()).Any(r => string.Equals(r, roleName, StringComparison.OrdinalIgnoreCase))).ToList();
            return Ok(list);
        }

        // POST: api/employee/verifytoken
        // Body: { "token": "..." }
        [HttpPost("verifytoken")]
        public IActionResult VerifyToken([FromBody] TokenRequest request)
        {
            if (string.IsNullOrWhiteSpace(request?.Token))
                return BadRequest("Token is required in the request body as { "token": "..." }");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(SecretKey);

            try
            {
                var parameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = "BankSystem",
                    ValidateAudience = true,
                    ValidAudience = "BankEmployees",
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromSeconds(30)
                };

                var principal = tokenHandler.ValidateToken(request.Token, parameters, out var validatedToken);

                var claims = principal.Claims.Select(c => new { c.Type, c.Value }).ToList();
                return Ok(new { valid = true, claims });
            }
            catch (SecurityTokenException ex)
            {
                return BadRequest(new { valid = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { valid = false, message = ex.Message });
            }
        }

        private static void AssignSpecialRoles(int[] ids, string[] specialRoles)
        {
            if (_employees == null) return;

            foreach (int id in ids)
            {
                var emp = _employees.FirstOrDefault(e => e.Id == id);
                if (emp != null)
                    emp.Role = string.Join(", ", specialRoles);
            }
        }

        private static string GenerateJwtToken(BankEmployee emp)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("Id", emp.Id.ToString()),
                new Claim("Name", emp.FullName),
                new Claim("Role", emp.Role),
                new Claim("Bank", emp.BankName)
            };

            var token = new JwtSecurityToken(
                issuer: "BankSystem",
                audience: "BankEmployees",
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public class TokenRequest
        {
            public string? Token { get; set; }
        }
    }
}
