using MovieManagement.Application.DTOs;
using MovieManagement.Application.Interfaces;
using MovieManagement.Application.Queries;

namespace MovieManagement.Application.QueryHandlers
{
    public class SearchMoviesQueryHandler :
        IQueryHandler<SearchMoviesQuery, PagedResult<Movie>>
    {
        private readonly IMovieRepository _repo;

        public SearchMoviesQueryHandler(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task<PagedResult<Movie>> HandleAsync(SearchMoviesQuery query)
        {
            var movies = await _repo.GetAllAsync();

 
            var keywords = (query.Value ?? "")
                .Split(new[] { ',', ' ' },
                    StringSplitOptions.RemoveEmptyEntries)
                .Select(k => k.Trim())
                .ToList();

            IEnumerable<Movie> filtered = movies;

            if (keywords.Any())
            {
                switch (query.Criteria.ToLower())
                {
                    case "title":
                        filtered = movies.Where(m =>
                            m.Title != null &&
                            m.Title.Contains(query.Value ?? "",
                                StringComparison.OrdinalIgnoreCase));
                        break;

                    case "genre":
                        filtered = movies.Where(m =>
                            keywords.Any(k =>
                                m.Genre != null &&
                                m.Genre.Contains(k,
                                    StringComparison.OrdinalIgnoreCase)));
                        break;

                    case "year":
                        filtered = movies.Where(m =>
                            keywords.Any(k =>
                                m.Year.ToString().Contains(k)));
                        break;

                    default:
                        filtered = movies.Where(m =>
                            keywords.Any(k =>
                                (m.Title != null &&
                                 m.Title.Contains(k,
                                    StringComparison.OrdinalIgnoreCase))
                              ||
                                (m.Genre != null &&
                                 m.Genre.Contains(k,
                                    StringComparison.OrdinalIgnoreCase))
                            ));
                        break;
                }
            }

            var totalCount = filtered.Count();

            var items = filtered
                .OrderByDescending(x => x.Year)
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToList();

            return new PagedResult<Movie>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize
            };
        }
    }
}