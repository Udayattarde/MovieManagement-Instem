import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }
private movies: Movie[] = [
  {
    id: 1,
    title: "Gettysburg",
    year: 1993,
    directors: "Ronald F. Maxwell",
    releaseDate: "1993-10-08",
    rating: 7.5,
    genres: "Drama, History, War",
    imageUrl: "https://ia.media-imdb.com/images/M/MV5BMTQwMjE3NDg4NV5BMl5BanBnXkFtZTcwMDI3MTE2Mw@@._V1_SX400_.jpg",
    plot: "In 1863, the Northern and Southern forces fight at Gettysburg in the decisive battle of the American Civil War.",
    rank: 3545,
    runningTimeSecs: 16260,
    actors: "Tom Berenger, Martin Sheen, Stephen Lang"
  },
  {
    id: 2,
    title: "Hamlet",
    year: 1996,
    directors: "Kenneth Branagh",
    releaseDate: "1996-12-25",
    rating: 7.7,
    genres: "Crime, Drama, Romance, Thriller",
    imageUrl: "https://ia.media-imdb.com/images/M/MV5BMjA4OTM4NzMxOF5BMl5BanBnXkFtZTcwMDY1OTM2MQ@@._V1_SX400_.jpg",
    plot: "Hamlet, Prince of Denmark, returns home to find his father murdered and his mother remarrying the murderer, his uncle.",
    rank: 2702,
    runningTimeSecs: 14520,
    actors: "Kenneth Branagh, Julie Christie, Derek Jacobi"
  },
  {
    id: 3,
    title: "Once Upon a Time in America",
    year: 1984,
    directors: "Sergio Leone",
    releaseDate: "1984-02-17",
    rating: 8.4,
    genres: "Crime, Drama",
    imageUrl: "https://ia.media-imdb.com/images/M/MV5BNDMwMDcyODkzOV5BMl5BanBnXkFtZTcwNTQ1Njg3OA@@._V1_SX400_.jpg",
    plot: "A former Prohibition-era Jewish gangster returns to Manhattan confronting his past.",
    rank: 857,
    runningTimeSecs: 13740,
    actors: "Robert De Niro, James Woods, Elizabeth McGovern"
  },
  {
    id: 4,
    title: "The Ten Commandments",
    year: 1956,
    directors: "Cecil B. DeMille",
    releaseDate: "1956-10-05",
    rating: 7.8,
    genres: "Adventure, Drama, History",
    imageUrl: "https://ia.media-imdb.com/images/M/MV5BMjE0MTg5MTI3OF5BMl5BanBnXkFtZTcwODE5MzMzMQ@@._V1_SX400_.jpg",
    plot: "The Egyptian Prince Moses learns his true heritage.",
    rank: 2340,
    runningTimeSecs: 13200,
    actors: "Charlton Heston, Yul Brynner, Anne Baxter"
  },
  {
    id: 5,
    title: "Lawrence of Arabia",
    year: 1962,
    directors: "David Lean",
    releaseDate: "1962-12-10",
    rating: 8.4,
    genres: "Adventure, Biography, Drama, History, War",
    imageUrl: "https://ia.media-imdb.com/images/M/MV5BMzAwMjM4NzA2OV5BMl5BanBnXkFtZTcwMDI0NzAwMQ@@._V1_SX400_.jpg",
    plot: "A British military figure struggles with loyalty during WWI.",
    rank: 1445,
    runningTimeSecs: 12960,
    actors: "Peter O'Toole, Alec Guinness, Anthony Quinn"
  }
];


  getLatestMovies(): Movie[] {
    return [...this.movies]
      .sort((a,b)=> b.year - a.year)
      .slice(0,4);
  }



searchMovies(criteria: string, value: string): Movie[] {
    const allMovies = this.movies; 
    
    if(!value || !value.trim()) return [];
    
    const searchValue = value.toLowerCase().trim();
    
    return allMovies.filter(m => {
      switch(criteria) {
        case 'title':
          return m.title.toLowerCase().includes(searchValue);
        
        case 'genre':
          const genres = m.genres.toLowerCase().split(', ');
          return genres.some(genre => genre.includes(searchValue));
        
        case 'year':
          return m.year.toString().includes(searchValue);
        
        default:
          return false;
      }
    });
  }
 
 getById(id:number){
  return this.movies.find(m => m.id === id);
}

update(movie:any){
  const i = this.movies.findIndex(x => x.id === movie.id);
  if(i !== -1) this.movies[i] = movie;
}

delete(id:number){
  this.movies = this.movies.filter(x => x.id !== id);
}

}
