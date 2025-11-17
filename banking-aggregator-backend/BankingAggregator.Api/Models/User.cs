namespace BankingAggregator.Api;


public class User
{
    public int Id { get; set; }

    public string Username { get; set; }
    public string PasswordHash { get; set; }

    public string Email { get; set; }   // ✅ Missing field added

    public int RoleId { get; set; }
    public Role Role { get; set; }

    public List<RefreshToken> RefreshTokens { get; set; }
}
