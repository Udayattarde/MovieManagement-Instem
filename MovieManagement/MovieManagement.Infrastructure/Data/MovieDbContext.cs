using Microsoft.EntityFrameworkCore;


namespace MovieManagement.Infrastructure.Data;

public class MovieDbContext : DbContext
{
    public DbSet<Movie> Movies { get; set; } = null!;

    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.ToTable("Movies");

            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();

            entity.Property(e => e.Title).HasMaxLength(300);
            entity.Property(e => e.Director).HasMaxLength(200);
            entity.Property(e => e.Genre).HasMaxLength(500);
            entity.Property(e => e.Plot).HasMaxLength(4000);
            entity.Property(e => e.ImageUrl).HasMaxLength(1000);

            // string column
            entity.Property(e => e.ReleaseDate).HasMaxLength(50);

            entity.Property(e => e.Rating).HasColumnType("decimal(3,1)");
        });
    }
}