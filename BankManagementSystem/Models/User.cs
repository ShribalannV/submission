using System.ComponentModel.DataAnnotations;

namespace BankManagementSystem.Models
{
    public enum UserRole
    {
        Customer,
        Minor,
        POA
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string FullName { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
        public string Password { get; set; }

        public UserRole Role { get; set; } = UserRole.Customer;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Active";

        public ICollection<Account>? Accounts { get; set; }
    }
}
