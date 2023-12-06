import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlistMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWatchlist().subscribe(
      (movies: Movie[]) => {
        this.watchlistMovies = movies;
      },
      (error) => {
        console.error('Error fetching watchlist:', error);
      }
    );
  }

  removeFromWatchlist(movie: Movie): void {
    this.movieService.removeFromWatchlist(movie.id);
    this.watchlistMovies = this.watchlistMovies.filter((m) => m.id !== movie.id);
  }



}
