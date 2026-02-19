import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://localhost:7278/api/movies';

  constructor(private http: HttpClient) { }

  // ✅ Latest Movies (Home Page)
  getLatestMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      map(movies =>
        movies
          .sort((a, b) => b.year - a.year)
          .slice(0, 4)
      )
    );
  }

  // ✅ Get All Movies
  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // ✅ Search Movies (using API data)
  searchMovies(criteria: string, value: string): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.apiUrl).pipe(
      map(allMovies => {

        if (!value || !value.trim()) return [];

        const searchValue = value.toLowerCase().trim();

        return allMovies.filter(m => {

          switch (criteria) {

            case 'title':
              return m.title.toLowerCase().includes(searchValue);

            case 'genre':
              return m.genre.toLowerCase().includes(searchValue);

            case 'year':
              return m.year.toString().includes(searchValue);

            default:
              return false;
          }
        });
      })
    );
  }

  // ✅ Get By Id
  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  // ✅ Update Movie
  update(movie: Movie) {
    //return this.http.put(`${this.apiUrl}/${movie.id}`, movie);
     return this.http.put(this.apiUrl, movie);
  }

  // ✅ Delete Movie
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
