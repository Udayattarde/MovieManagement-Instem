import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    private router: Router) {}

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
      this.msg="All fields required";
      return;
    }

    this.service.update(this.movie)
      .subscribe(()=>{
        this.edit = false;
        this.msg="Updated successfully";
      });
  }


  deleteMovie(){

    if(confirm("Delete movie ?")){

      this.service.delete(this.movie.id!)
        .subscribe(()=>{
          alert("Deleted ✅");
          this.router.navigate(['/']);
        });
    }
  }
}
