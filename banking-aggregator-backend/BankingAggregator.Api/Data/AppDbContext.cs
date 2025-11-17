using Microsoft.EntityFrameworkCore;
using BankingAggregator.Api.Models;

namespace BankingAggregator.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions opts) : base(opts) { }
        public DbSet<User> Users => Set<User>();
        public DbSet<Bank> Banks => Set<Bank>();
        public DbSet<Branch> Branches => Set<Branch>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    }
}