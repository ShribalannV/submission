using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountId { get; set; }

        [Required]
        [MaxLength(20)]
        public string AccountNumber { get; set; } = Guid.NewGuid().ToString().Substring(0, 10).ToUpper();

        [Required]
        public int UserId { get; set; }   // foreign key

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        [MaxLength(20)]
        public string AccountType { get; set; }  // "Savings", "Current", "NRI", etc.

        [Required]
        public decimal Balance { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
