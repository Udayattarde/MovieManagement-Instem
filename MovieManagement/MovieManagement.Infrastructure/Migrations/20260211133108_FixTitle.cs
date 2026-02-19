using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Director = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ReleaseDate = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(3,1)", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Plot = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    RunningTimeSecs = table.Column<int>(type: "int", nullable: false),
                    Actors = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
