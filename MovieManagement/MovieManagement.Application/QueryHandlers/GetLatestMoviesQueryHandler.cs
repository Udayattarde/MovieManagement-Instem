using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.QueryHandlers
{
    public class GetLatestMoviesQueryHandler
     : IQueryHandler<GetLatestMoviesQuery, List<Movie>>
    {
        private readonly IMovieRepository _repo;

        public GetLatestMoviesQueryHandler(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Movie>> HandleAsync(GetLatestMoviesQuery query)
        {
            var movies = await _repo.GetAllAsync();

            return movies
                .OrderByDescending(x => x.Year)
                //.Take(4)
                .ToList();
        }
    }
}
