import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

export const routes: Routes = [
     { path:'', component: HomeComponent },
       { path:'search', component: SearchComponent },
  { path:'search_results', component: SearchResultsComponent },
   { path: 'details/:id', component: MovieDetailsComponent }
];
