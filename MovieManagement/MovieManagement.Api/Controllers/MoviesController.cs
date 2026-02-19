using Microsoft.AspNetCore.Mvc;
using MovieManagement.Application.Commands;
using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly ICommandHandler<CreateMovieCommand> _create;
    private readonly ICommandHandler<UpdateMovieCommand> _update;
    private readonly ICommandHandler<DeleteMovieCommand> _delete;
    private readonly IQueryHandler<GetLatestMoviesQuery, List<Movie>> _getAll;
    private readonly IQueryHandler<GetMovieByIdQuery, Movie?> _getById;

    public MoviesController(
        ICommandHandler<CreateMovieCommand> create,
        ICommandHandler<UpdateMovieCommand> update,
        ICommandHandler<DeleteMovieCommand> delete,
        IQueryHandler<GetLatestMoviesQuery, List<Movie>> getAll,
        IQueryHandler<GetMovieByIdQuery, Movie?> getById)
    {
        _create = create;
        _update = update;
        _delete = delete;
        _getAll = getAll;
        _getById = getById;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMovieCommand cmd)
    {
        await _create.HandleAsync(cmd);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateMovieCommand cmd)
    {
        await _update.HandleAsync(cmd);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _delete.HandleAsync(new DeleteMovieCommand { Id = id });
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _getAll.HandleAsync(new GetLatestMoviesQuery()));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => Ok(await _getById.HandleAsync(new GetMovieByIdQuery { Id = id }));
}
