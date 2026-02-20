import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
    encapsulation: ViewEncapsulation.None 
})
export class AddMovieComponent {

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  movieForm = this.fb.group({
    title: ['', Validators.required],
    year: ['', Validators.required],
    directors: ['', Validators.required],
    genres: ['', Validators.required],
    rating: ['', Validators.required],
    releaseDate: ['', Validators.required],
    runningTimeSecs: ['', Validators.required],
    actors: ['', Validators.required],
    imageUrl: [''],
    plot: [''],
    rank: [0]
  });

  get f() {
    return this.movieForm.controls;
  }

  save() {

    if (this.movieForm.invalid) {

      // show field messages
      this.movieForm.markAllAsTouched();

      this.snackBar.open(
        'Please fix required fields',
        'Close',
        { duration: 2500 }
      );
      return;
    }

    this.movieService.create(this.movieForm.value as any)
    .subscribe({
      next: () => {
        this.snackBar.open(
          'Movie added successfully',
          'Close',
          { duration: 2000 }
        );
        this.router.navigate(['/']);
      },

      error: (err) => {

  const message =
    err.error?.message || 'Server error';

  this.snackBar.open(message, 'Close', {
    duration: 3500
  });
}
    });
}
}