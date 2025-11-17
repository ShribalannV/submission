namespace BankingAggregator.Api;

public class Transaction
{
    public int Id { get; set; }

    public int AccountId { get; set; }
    public Account Account { get; set; }

    public string Type { get; set; }  // credit / debit
    public decimal Amount { get; set; }

    public string Description { get; set; } // ✅ Added

    public int? CounterpartyAccountId { get; set; } // nullable for safety
    public Account CounterpartyAccount { get; set; } // FK reference

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // ✅ Added
}
