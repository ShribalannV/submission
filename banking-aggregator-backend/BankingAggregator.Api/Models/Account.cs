namespace BankingAggregator.Api;

public class Account
{
    public int Id { get; set; }

    public string AccountNumber { get; set; }
    public string AccountType { get; set; }

    public decimal Balance { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // ✅ Added

    public bool IsClosed { get; set; } = false; // ✅ Added

    public int UserId { get; set; }
    public User User { get; set; }
}
