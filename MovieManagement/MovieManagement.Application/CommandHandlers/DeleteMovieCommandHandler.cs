using MovieManagement.Application.Commands;
using MovieManagement.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.CommandHandlers
{
    public class DeleteMovieCommandHandler
    : ICommandHandler<DeleteMovieCommand>
    {
        private readonly IMovieRepository _repository;

        public DeleteMovieCommandHandler(IMovieRepository repository)
        {
            _repository = repository;
        }

        public async Task HandleAsync(DeleteMovieCommand command)
        {
            var movie = await _repository.GetByIdAsync(command.Id);

            if (movie == null)
                throw new Exception("Movie not found");

            await _repository.DeleteAsync(movie);
            await _repository.SaveChangesAsync();
        }
    }

}
