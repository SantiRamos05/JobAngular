import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  sortedMovies: any[] = [];

  constructor(private movieService: MovieService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: any[]) => {
      this.movies = data;
      this.sortedMovies = [...this.movies];
      console.log(this.movies);
    });
  }

  sortByTitle(): void {
    this.sortedMovies = [...this.movies].sort((a, b) => a.Title.localeCompare(b.Title));
  }

  sortByReleasedDate(): void {
    this.sortedMovies = [...this.movies].sort((a, b) => this.globalService.convertToDate(a['Released date']).getTime() - this.globalService.convertToDate(b['Released date']).getTime());
  }
}
