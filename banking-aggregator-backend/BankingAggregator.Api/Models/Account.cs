using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace BankingAggregator.Api.Models

{

    public class Account

    {

        [Key] public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserId { get; set; }

        public Guid BankId { get; set; }

        public Guid BranchId { get; set; }

        public string AccountNumber { get; set; } = "";

        [Column(TypeName = "decimal(18,2)")] public decimal Balance { get; set; } = 0m;

        public bool IsClosed { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

}

