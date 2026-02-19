import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-search-results',
  standalone: true,
 imports:[CommonModule, RouterModule,NgxLoadingModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
   movies:Movie[]=[];
     loading = false;  

  constructor(
    private route:ActivatedRoute,
    private movieService:MovieService
  ){}

  ngOnInit():void{

  this.route.queryParams.subscribe(params => {
      const criteria = params['criteria'];
      const value = params['value'];

      this.loading = true;  
      
      console.log('Searching for:', criteria, 'with value:', value); 
      //this.movies = this.movieService.searchMovies(criteria, value);
     this.movieService.searchMovies(criteria, value)
        .subscribe({
          next: res => {
            this.movies = res;
            this.loading = false; 
          },
          error: () => this.loading = false
        });
    });
  }
}
