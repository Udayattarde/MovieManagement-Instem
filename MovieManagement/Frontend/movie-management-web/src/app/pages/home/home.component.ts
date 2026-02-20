import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,  
    NgxSpinnerModule,
    NgxLoadingModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  loading = false;

  currentPage = 1;
  totalPages = 0;
  pageSize = 4;
  visiblePages: number[] = [];

  // ✅ SEARCH VARIABLES
  searchCriteria: string = 'all';
  searchValue: string = '';

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMovies(1);
  }

 
  setVisiblePages() {
    const pageGroupSize = 5;

    const start =
      Math.floor((this.currentPage - 1) / pageGroupSize)
      * pageGroupSize + 1;

    const end = Math.min(start + pageGroupSize - 1, this.totalPages);

    this.visiblePages = [];

    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

 loadMovies(page: number) {

  this.loading = true;
  this.currentPage = page;

  const request$ =
    this.searchValue && this.searchValue.trim() !== ''
      ? this.movieService.searchMoviesPaged(
          this.searchCriteria,
          this.searchValue,
          page,
          this.pageSize
        )
      : this.movieService.getLatestMoviesPaged(
          page,
          this.pageSize
        );

  request$.subscribe({

    next: res => {
      this.movies = res.items;
      this.totalPages = Math.ceil(res.totalCount / res.pageSize);
      this.setVisiblePages();
      this.loading = false;
    },

    error: () => {
      this.loading = false;
      this.snackBar.open(
        'Failed to load movies',
        'Close',
        { duration: 1000 }
      );
    }
  });
}

  searchMovies() {
    this.currentPage = 1;
    this.loadMovies(1);
  }

  clearSearch() {
    this.searchCriteria = 'all';
    this.searchValue = '';
    this.loadMovies(1);
  }
}
