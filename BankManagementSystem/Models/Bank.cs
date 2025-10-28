using System.ComponentModel.DataAnnotations;

namespace BankManagementSystem.Models
{
    public class Bank
    {
        [Key]
        public int BankId { get; set; }

        [Required]
        public string BankName { get; set; }

        public string HeadOffice { get; set; }

        public ICollection<Branch>? Branches { get; set; }
    }
}
