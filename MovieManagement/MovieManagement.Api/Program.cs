using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MovieManagement.Application.CommandHandlers;
using MovieManagement.Application.Commands;
using MovieManagement.Application.DTOs;
using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;
using MovieManagement.Application.QueryHandlers;
using MovieManagement.Infrastructure.Data;
using MovieManagement.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy =
            System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IMovieRepository, MovieRepository>();

// Commands
builder.Services.AddScoped<ICommandHandler<CreateMovieCommand>, CreateMovieCommandHandler>();
builder.Services.AddScoped<ICommandHandler<UpdateMovieCommand>, UpdateMovieCommandHandler>();
builder.Services.AddScoped<ICommandHandler<DeleteMovieCommand>, DeleteMovieCommandHandler>();

// Queries
builder.Services.AddScoped<IQueryHandler<GetLatestMoviesQuery, List<Movie>>, GetLatestMoviesQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetMovieByIdQuery, Movie?>, GetMovieByIdQueryHandler>();
builder.Services.AddScoped<IQueryHandler<SearchMoviesQuery, PagedResult<Movie>>,SearchMoviesQueryHandler>();

builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});


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

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();