using BankingAggregator.Api.Models;
using System.Security;

public class Role
{
    public int Id { get; set; }
    public string ?RoleName { get; set; }

    public ICollection<User> ?Users { get; set; }

    public ICollection<Permission> ?Permissions { get; set; }

}
