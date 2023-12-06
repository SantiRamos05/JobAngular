import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { GlobalService } from 'src/app/services/global.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  movie: Movie[] = [];
  sortedMovies: any[] = [];

  constructor(private movieService: MovieService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: any[]) => {
      this.movies = data;
      this.loadWatchlistFromLocalStorage();
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

  addToWatchlist(movie: any): void {
    this.movieService.addToWatchlist(movie);
  }

  toggleWatchlist(movie: any): void {
    this.movieService.updateWatchlistStatus(movie);
  }

  loadWatchlistFromLocalStorage(): void {
    const watchlistString = localStorage.getItem('watchlist');
    const watchlist = watchlistString ? JSON.parse(watchlistString) : [];
    this.movies.forEach(movie => {
      movie.isInWatchlist = watchlist.includes(movie.id);
    });
  }
}
