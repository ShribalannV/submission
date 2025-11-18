using System;
using System.Collections.Generic;

namespace BankingAggregator.Api.Models
{
    public class Account
    {
        public Guid Id { get; set; }
        public string AccountNumber { get; set; } = "";
        public decimal Balance { get; set; }
        public bool IsClosed { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }  // Owner
        public User ?User { get; set; }

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
