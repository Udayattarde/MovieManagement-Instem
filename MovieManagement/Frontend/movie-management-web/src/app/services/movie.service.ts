import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://localhost:7278/api/movies';

  constructor(private http: HttpClient) { }


  getLatestMoviesPaged(
    page: number,
    pageSize: number = 4
  ): Observable<PagedResult<Movie>> {

    return this.http.get<PagedResult<Movie>>(
      `${this.apiUrl}/search`,
      {
        params: {
          criteria: 'all',
          value: '',
          pageNumber: page,
          pageSize: pageSize
        }
      }
    );
  }

  searchMoviesPaged(
    criteria: string,
    value: string,
    page: number = 1,
    pageSize: number = 1000
  ): Observable<PagedResult<Movie>> {

    return this.http.get<PagedResult<Movie>>(
      `${this.apiUrl}/search`,
      {
        params: {
          criteria: criteria,
          value: value,
          pageNumber: page,
          pageSize: pageSize
        }
      }
    );
  }

create(movie: Movie) {
  return this.http.post(this.apiUrl, movie);
}
  getById(id: number) {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  update(movie: Movie) {
    return this.http.put(this.apiUrl, movie);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
