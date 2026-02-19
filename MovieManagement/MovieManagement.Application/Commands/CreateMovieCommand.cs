using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Commands
{
    public class CreateMovieCommand
    {
        public string Title { get; set; } = "";
        public int Year { get; set; }
        public string Directors { get; set; } = "";
        public string ReleaseDate { get; set; } = "";
        public decimal Rating { get; set; }
        public string Genres { get; set; } = "";
        public string? ImageUrl { get; set; }
        public string? Plot { get; set; }
        public int Rank { get; set; }
        public int RunningTimeSecs { get; set; }
        public string Actors { get; set; } = "";
    }

}
