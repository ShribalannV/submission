using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BankManagementSystem.Models;

namespace BankManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessTestController : ControllerBase
    {
        
        [HttpGet("admin")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult GetAdmin()
        {
            return Ok("Hello Admin! You have full system access.");
        }

        
        [HttpGet("employee")]
        [Authorize(Roles = $"{UserRoles.Employee},{UserRoles.Admin}")]
        public IActionResult GetEmployee()
        {
            return Ok("Hello Employee! You have limited access to manage users and accounts.");
        }

        
        [HttpGet("customer")]
        [Authorize(Roles = $"{UserRoles.Customer},{UserRoles.Employee},{UserRoles.Admin}")]
        public IActionResult GetCustomer()
        {
            return Ok("Hello Customer! You can view your own account and transaction details.");
        }

        
        [HttpGet("public")]
        [AllowAnonymous]
        public IActionResult GetPublic()
        {
            return Ok(" This endpoint is public — no authentication needed.");
        }
    }
}
