using System.Text.Json;
using MovieManagement.Infrastructure.Data;

public static class MovieSeeder
{
    public static void Seed(MovieDbContext context)
    {
        if (context.Movies.Any())
        {
            Console.WriteLine("Already seeded");
            return;
        }

        string path = Path.Combine(
            Directory.GetCurrentDirectory(),
            "movieData2.json"
        );

        string json = File.ReadAllText(path);

        var doc = JsonSerializer.Deserialize<List<Dictionary<string, JsonElement>>>(json);

        var movies = new List<Movie>();

        foreach (var item in doc)
        {
            var movie = new Movie
            {
                //done for avoid  number to string error from json result
                Title = item["Title"].ToString(),

                Year = item["Year"].GetInt32(),

                Director = item["Directors"].ToString(),

                ReleaseDate = item["Release Date"].ToString(),

                Rating = item["Rating"].GetDecimal(),

                Genre = item["Genres"].ToString(),

                ImageUrl = item["Image URL"].ToString(),

                Plot = item["Plot"].ToString(),

                Rank = item["Rank"].GetInt32(),

                RunningTimeSecs =
                    item["Running Time (secs)"].GetInt32(),

                Actors = item["Actors"].ToString()
            };

            movies.Add(movie);
        }

        context.Movies.AddRange(movies);
        context.SaveChanges();

        Console.WriteLine($"Seeded {movies.Count} movies OK!");
    }
}
