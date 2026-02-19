using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.QueryHandlers
{
    public class SearchMoviesQueryHandler
      : IQueryHandler<SearchMoviesQuery, List<Movie>>
    {
        private readonly IMovieRepository _repo;

        public SearchMoviesQueryHandler(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Movie>> HandleAsync(SearchMoviesQuery query)
        {
            var movies = await _repo.GetAllAsync();

            return movies.Where(m =>
                query.Criteria == "title"
                    ? m.Title.Contains(query.Value)
                : query.Criteria == "genre"
                    ? m.Genre.Contains(query.Value)
                : m.Year.ToString().Contains(query.Value)
            ).ToList();
        }
    }
}
