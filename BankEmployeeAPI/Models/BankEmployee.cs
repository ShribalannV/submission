namespace BankEmployeeAPI.Models
{
    public class BankEmployee
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string BankName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}


