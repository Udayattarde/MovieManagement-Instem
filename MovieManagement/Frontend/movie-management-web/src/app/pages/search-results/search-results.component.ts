import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
 imports:[CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
   movies:Movie[]=[];

  constructor(
    private route:ActivatedRoute,
    private movieService:MovieService
  ){}

  ngOnInit():void{

  this.route.queryParams.subscribe(params => {
      const criteria = params['criteria'];
      const value = params['value'];
      
      console.log('Searching for:', criteria, 'with value:', value); 
      //this.movies = this.movieService.searchMovies(criteria, value);
      this.movieService.searchMovies(criteria, value)
  .subscribe(res => this.movies = res);
      console.log('Results:', this.movies); 
    });
  }
}
