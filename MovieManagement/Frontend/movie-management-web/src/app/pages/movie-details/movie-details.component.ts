import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector:'app-movie-details',
  standalone:true,
  imports:[CommonModule,RouterModule,FormsModule],
  templateUrl:'./movie-details.component.html'
})
export class MovieDetailsComponent {


}
