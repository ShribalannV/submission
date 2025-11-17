using System.Security;

public class Role
{
    public int Id { get; set; }
    public string RoleName { get; set; }

    public List<Permission> Permissions { get; set; }
}
