using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Movie
{
    [Key]
    public int Id { get; set; }

    public string? Title { get; set; } = "";

    public int Year { get; set; }


    public string Director { get; set; } = "";

   

    public string ReleaseDate { get; set; } = "";

    public decimal Rating { get; set; }


    public string Genre { get; set; } = "";


    public string? ImageUrl { get; set; }

    public string? Plot { get; set; }

    public int Rank { get; set; }

    //[JsonPropertyName("Running Time (secs)")]
    public int RunningTimeSecs { get; set; }

    public string Actors { get; set; } = "";
}
