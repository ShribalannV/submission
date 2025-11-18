using System;

namespace BankingAggregator.Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public Guid AccountId { get; set; }     // the account performing the transaction
        public Account ?Account { get; set; }

        public string Type { get; set; } = "";  // deposit, withdraw, transfer-in, transfer-out
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public Guid? CounterpartyAccountId { get; set; } // for transfers
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
