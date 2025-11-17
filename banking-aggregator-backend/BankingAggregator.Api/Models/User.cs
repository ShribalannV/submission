namespace BankingAggregator.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = "";
        public string FullName { get; set; } = "";
        public string Role { get; set; } = "";

        public ICollection<Account> ?Accounts { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
