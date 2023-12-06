import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'assets/movies.json';
  private watchlistKey = 'watchlist';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesUrl);
  }

  getMovieById(id: number): Observable<any> {
    return this.getMovies().pipe(
      map(movies => movies.find(movie => movie.id === id))
    );
  }


   getWatchlist(): Movie[] {
    const watchlistStr = localStorage.getItem(this.watchlistKey);
    return watchlistStr ? JSON.parse(watchlistStr) : [];
  }


  addToWatchlist(movie: Movie): void {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.concat(movie);
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }


  updateWatchlistStatus(movie: Movie): void {
    movie.isInWatchlist = !movie.isInWatchlist;
    if (movie.isInWatchlist) {
      this.addToWatchlist(movie);
    } else {
      this.removeFromWatchlist(movie.id);
    }
  }


  removeFromWatchlist(movieId: number): void {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.filter((movie) => movie.id !== movieId);
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }



}
