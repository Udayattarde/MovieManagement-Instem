using MovieManagement.Application.Commands;
using MovieManagement.Application.Interfaces;

namespace MovieManagement.Application.CommandHandlers;

public class CreateMovieCommandHandler
    : ICommandHandler<CreateMovieCommand>
{
    private readonly IMovieRepository _repository;

    public CreateMovieCommandHandler(IMovieRepository repository)
    {
        _repository = repository;
    }

    public async Task HandleAsync(CreateMovieCommand command)
    {

        var movie = new Movie
        {
            Title = command.Title.Trim(),
            Year = command.Year,
            Director = command.Directors.Trim(),
            ReleaseDate = command.ReleaseDate,
            Rating = command.Rating,
            Genre = command.Genres.Trim(),
            ImageUrl = command.ImageUrl,
            Plot = command.Plot,
            Rank = command.Rank,
            RunningTimeSecs = command.RunningTimeSecs,
            Actors = command.Actors.Trim()
        };

        await _repository.AddAsync(movie);
        await _repository.SaveChangesAsync();
    }
}
