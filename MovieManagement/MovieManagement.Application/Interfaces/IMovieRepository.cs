using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Interfaces
{
    public interface IMovieRepository
    {
        Task AddAsync(Movie movie);
        Task<Movie?> GetByIdAsync(int id);
        Task SaveChangesAsync();
        Task<List<Movie>> GetAllAsync();
        Task DeleteAsync(Movie movie);
    }
}
