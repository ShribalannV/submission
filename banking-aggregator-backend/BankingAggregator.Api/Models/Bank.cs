using System.ComponentModel.DataAnnotations;

namespace BankingAggregator.Api.Models { 
    public class Bank { 
        [Key] public Guid Id { get; set; } = Guid.NewGuid(); 
        public string Name { get; set; } = ""; 
        public string Code { get; set; } = "";
    } 
}