using Microsoft.EntityFrameworkCore;
using MovieManagement.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MovieDbContext>();
    MovieSeeder.Seed(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // <--- Add seeding here --->
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<MovieDbContext>();
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();