namespace BankingAggregator.Api;
public class Branch
{
    public int Id { get; set; }
    public string ?BranchName { get; set; }
    public string ?IFSC { get; set; }

    public int BankId { get; set; }
    public Bank ?Bank { get; set; }
}
