using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Commands
{
    public class UpdateMovieCommand
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Genre { get; set; } = "";
        public decimal Rating { get; set; }

        public int Rank { get; set; }
        public string? Plot { get; set; }

        public int Year { get; set; }

    }
}
