using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Movie
{
    [Key]
    public int Id { get; set; }

    public string? Title { get; set; } = "";

    public int Year { get; set; }

    [JsonPropertyName("Directors")]
    public string Director { get; set; } = "";

   
    [JsonPropertyName("Release Date")]
    public string ReleaseDate { get; set; } = "";

    public decimal Rating { get; set; }

    [JsonPropertyName("Genres")]
    public string Genre { get; set; } = "";

    [JsonPropertyName("Image URL")]
    public string? ImageUrl { get; set; }

    public string? Plot { get; set; }

    public int Rank { get; set; }

    [JsonPropertyName("Running Time (secs)")]
    public int RunningTimeSecs { get; set; }

    public string Actors { get; set; } = "";
}
