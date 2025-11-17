using System.ComponentModel.DataAnnotations;

namespace BankingAggregator.Api.Models

{

    public class User

    {

        [Key] public Guid Id { get; set; } = Guid.NewGuid();

        public string Email { get; set; } = "";

        public string PasswordHash { get; set; } = "";

        public string FullName { get; set; } = "";

        public string Role { get; set; } = "user";

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

}

