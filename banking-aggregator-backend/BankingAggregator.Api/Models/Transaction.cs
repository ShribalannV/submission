using System.ComponentModel.DataAnnotations;

namespace BankingAggregator.Api.Models

{

    public class Transaction

    {

        [Key] public Guid Id { get; set; } = Guid.NewGuid();

        public Guid AccountId { get; set; }

        public string Type { get; set; } = "";

        public decimal Amount { get; set; }

        public Guid? CounterpartyAccountId { get; set; }

        public string Description { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

}

