using Microsoft.EntityFrameworkCore;
using BankingAggregator.Api.Models;
namespace BankingAggregator.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Prefix all tables with schema name "banking"
            modelBuilder.Entity<Account>().ToTable("Accounts", "banking");
            modelBuilder.Entity<Transaction>().ToTable("Transactions", "banking");
            modelBuilder.Entity<User>().ToTable("Users", "banking");
            modelBuilder.Entity<RefreshToken>().ToTable("RefreshTokens", "banking");
            modelBuilder.Entity<Role>().ToTable("Roles", "banking");
            modelBuilder.Entity<Permission>().ToTable("Permissions", "banking");
            modelBuilder.Entity<Bank>().ToTable("Banks", "banking");
            modelBuilder.Entity<Branch>().ToTable("Branches", "banking");

            // Define relationships
            modelBuilder.Entity<Account>()
                .HasMany(a => a.Transactions)
                .WithOne(t => t.Account)
                .HasForeignKey(t => t.AccountId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.RefreshTokens)
                .WithOne(rt => rt.User)
                .HasForeignKey(rt => rt.UserId);

            // Add other relationships as needed
        }
    }
}
