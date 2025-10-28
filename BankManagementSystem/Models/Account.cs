using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankManagementSystem.Models
{
    public enum AccountType
    {
        Savings,
        Current,
        TermDeposit,
        NRI
    }

    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [ForeignKey("Branch")]
        public int BranchId { get; set; }
        public Branch? Branch { get; set; }

        public AccountType AccountType { get; set; }

        public string Currency { get; set; } = "INR";

        public decimal Balance { get; set; }

        public bool IsMinor { get; set; } = false;

        public string Status { get; set; } = "Active";

        public ICollection<Transaction>? Transactions { get; set; }
    }
}
