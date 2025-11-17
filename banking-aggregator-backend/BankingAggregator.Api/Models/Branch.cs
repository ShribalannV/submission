using System.ComponentModel.DataAnnotations;

namespace BankingAggregator.Api.Models { 
    public class Branch { 
        [Key] public Guid Id { get; set; } = Guid.NewGuid();
        public Guid BankId { get; set; }
        public string Name { get; set; } = ""; 
        public string Code { get; set; } = ""; 
        public string Address { get; set; } = ""; 
    }
}

