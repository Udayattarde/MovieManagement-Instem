using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Queries
{
    public class SearchMoviesQuery
    {
        public string Criteria { get; set; } = "";
        public string Value { get; set; } = "";
    }
}
