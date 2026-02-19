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

    // ✅ API CALL (ASYNC)
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

  this.service.update(this.movie)
  .subscribe({
    next: () => {
      this.edit = false;
      //this.msg="Updated successfully";
      this.snackBar.open(
        'Movie updated successfully',
        'Close',
        { duration:3000, verticalPosition:'top', horizontalPosition:'right'}
      );
    },
    error: () => {
      this.snackBar.open(
        'Update failed',
        'Close',
        { duration:3000 }
      );
    }
  });
}


  deleteMovie(){

    if(confirm("Delete movie ?")){

    this.service.delete(this.movie.id!)
      .subscribe({
        next: () => {

          this.snackBar.open(
            'Movie deleted successfully',
            'Close',
            { duration:3000, verticalPosition:'top', horizontalPosition:'right'}
          );

          this.router.navigate(['/']);
        },
        error: () => {
          this.snackBar.open('Delete failed','Close',{duration:3000});
        }
      });
    }
  }
}
