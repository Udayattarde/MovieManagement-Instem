import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone:true,
 selector:'app-movie-details',
  imports:[CommonModule, FormsModule],
  templateUrl:'./movie-details.component.html',
  styleUrl:'./movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie!: Movie;
  edit = false;
  msg = '';

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private router: Router,
   private snackBar: MatSnackBar) {}

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(id)
      .subscribe(data => {
        this.movie = data;
      });
  }


  save(){

    if(!this.movie.title || !this.movie.genre || !this.movie.plot){
      //this.msg="All fields required";
      this.snackBar.open('All fields required','Close',{
      duration:3000
    });
      return;
    }

      const updatePayload = {
    id: this.movie.id,
    title: this.movie.title,
    genre: this.movie.genre,
    rating: this.movie.rating,
    plot: this.movie.plot
  };
  this.service.update(updatePayload)
    .subscribe({
      next: () => {

        this.snackBar.open(
          'Movie edited successfully',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          }
        );
        this.edit=false;
        this.router.navigate(['/details', this.movie.id]);

      },
      error: () => {
        this.snackBar.open(
          'Update failed',
          'Close',
          { duration: 3000,
              verticalPosition: 'top',
            horizontalPosition: 'center'
          }
        );
      }
    });
}
deleteMovie() {

  const snackRef = this.snackBar.open(
    'Are you sure you want to delete this movie?',
    'DELETE',
    {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    }
  );

  snackRef.onAction().subscribe(() => {

    this.service.delete(this.movie.id!)
      .subscribe({
        next: () => {

          this.snackBar.open(
            'Movie deleted successfully',
            'Close',
            { duration: 3000, verticalPosition:'top', horizontalPosition:'right' }
          );

          this.router.navigate(['/']);
        },
        error: () => {
          this.snackBar.open(
            'Delete failed',
            'Close',
            { duration: 3000, verticalPosition:'top', horizontalPosition:'right' }
          );
        }
      });

  });
}

  // deleteMovie(){

  //   if(confirm("Delete movie ?")){

  //   this.service.delete(this.movie.id!)
  //     .subscribe({
  //       next: () => {

  //         this.snackBar.open(
  //           'Movie deleted successfully',
  //           'Close',
  //           { duration:3000, verticalPosition:'top', horizontalPosition:'right'}
  //         );

  //         this.router.navigate(['/']);
  //       },
  //       error: () => {
  //         this.snackBar.open('Delete failed','Close',{duration:3000,verticalPosition:'top', horizontalPosition:'right'});
  //       }
  //     });
  //   }
  // }
}
