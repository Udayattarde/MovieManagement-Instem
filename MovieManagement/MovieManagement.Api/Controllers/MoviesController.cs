using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieManagement.Infrastructure.Data;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieDbContext _context;

    public MoviesController(MovieDbContext context)
    {
        _context = context;
    }

    // GET: api/movies
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var movies = await _context.Movies.ToListAsync();
        return Ok(movies);
    }

    // GET: api/movies/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var movie = await _context.Movies.FindAsync(id);

        if (movie == null)
            return NotFound();

        return Ok(movie);
    }
}
