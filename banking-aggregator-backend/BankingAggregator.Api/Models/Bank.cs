namespace BankingAggregator.Api;
public class Bank
{
    public int Id { get; set; }
    public string BankName { get; set; } = "";

    public ICollection<Branch> ?Branches { get; set; }
}
