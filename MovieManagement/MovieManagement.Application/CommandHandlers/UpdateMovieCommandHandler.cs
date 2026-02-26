using MovieManagement.Application.Commands;
using MovieManagement.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.CommandHandlers
{
    public class UpdateMovieCommandHandler
     : ICommandHandler<UpdateMovieCommand>
    {
        private readonly IMovieRepository _repo;

        public UpdateMovieCommandHandler(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task HandleAsync(UpdateMovieCommand cmd)
        {
            var movie = await _repo.GetByIdAsync(cmd.Id);

            if (movie == null)
                throw new Exception("Movie not found");

            movie.Title = cmd.Title;
            movie.Genre = cmd.Genre;
            movie.Rating = cmd.Rating;
            movie.Plot = cmd.Plot;
            movie.Year = cmd.Year;
            movie.Rank = cmd.Rank;

            await _repo.SaveChangesAsync();
        }
    }
}
