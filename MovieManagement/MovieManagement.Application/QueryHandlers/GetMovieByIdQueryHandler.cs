using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.QueryHandlers
{
    public class GetMovieByIdQueryHandler
     : IQueryHandler<GetMovieByIdQuery, Movie?>
    {
        private readonly IMovieRepository _repo;

        public GetMovieByIdQueryHandler(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task<Movie?> HandleAsync(GetMovieByIdQuery query)
        {
            return await _repo.GetByIdAsync(query.Id);
        }
    }
}
