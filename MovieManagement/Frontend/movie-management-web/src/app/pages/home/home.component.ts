import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
 
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule,NgxSpinnerModule,NgxLoadingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
 movies: Movie[] = [];
  loading = false;   // ✅ loader flag

   constructor(private movieService: MovieService, private snackBar: MatSnackBar,
     private spinner: NgxSpinnerService
   ){}

  ngOnInit(): void {

      //this.spinner.show(); 
       
       
   this.loading = true;

      
  // setTimeout(() => {
  //   this.spinner.show();
  // });

     this.movieService.getLatestMovies()
    .subscribe({
        next: data => {
          this.movies = data;
            //this.spinner.hide();
            this.loading = false;
          this.snackBar.open(
            'Movies loaded successfully',
            'Close',
            {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        },

        error: () => {
           this.spinner.hide();
          this.snackBar.open(
            'Failed to load movies',
            'Close',
            {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      });
  }
}
