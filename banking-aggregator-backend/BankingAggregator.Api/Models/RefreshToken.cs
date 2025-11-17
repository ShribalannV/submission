using System.ComponentModel.DataAnnotations;

namespace BankingAggregator.Api.Models 
{ 
    public class RefreshToken { 
        [Key] public Guid Id { get; set; } = Guid.NewGuid(); 
        public Guid UserId { get; set; } 
        public string TokenHash { get; set; } = ""; 
        public DateTime ExpiresAt { get; set; } 
        public bool Revoked { get; set; } = false; 
    } 
}

