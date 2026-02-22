import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
   imports:[CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
 criteria:string='title';
  searchValue:string='';

  constructor(private router:Router){}

  search(){

    if(!this.searchValue.trim()){
      alert('Enter search value');
      return;
    }

    this.router.navigate(['/search_results'],{
      queryParams:{
        criteria:this.criteria,
        value:this.searchValue
      }
    });
  }

  gotToHome(){
  this.router.navigate(["/"]);
}
}
