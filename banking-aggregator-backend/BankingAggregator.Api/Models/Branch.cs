using System.ComponentModel.DataAnnotations;

public class Branch
{
    [Key]
    public Guid Id { get; set; }

    public Guid BankId { get; set; }
    public string Name { get; set; } = "";
    public string Code { get; set; } = "";
    public string Address { get; set; } = "";

    public Branch()
    {
        Id = Guid.NewGuid();
    }
}
