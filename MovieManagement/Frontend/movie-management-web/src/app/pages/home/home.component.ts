import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
 
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
 movies: Movie[] = [];

   constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.movies = this.movieService.getLatestMovies();
  }
}
