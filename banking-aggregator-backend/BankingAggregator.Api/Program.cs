using BankingAggregator.Api.Data;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// services

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>

    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=banking.db"));

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())

{

    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

}

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

