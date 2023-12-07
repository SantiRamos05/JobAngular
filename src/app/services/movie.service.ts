import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
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

  getWatchlist(): Observable<Movie[]> {
    const watchlistIds = this.getWatchlistIds();
    const movies = this.getMovies();
    return combineLatest([watchlistIds, movies]).pipe(
      map(([ids, allMovies]) => allMovies.filter(movie => ids.includes(movie.id)))
    );
  }

  getWatchlistIds(): Observable<number[]> {
    const watchlistStr = localStorage.getItem(this.watchlistKey);
    const watchlist = watchlistStr ? JSON.parse(watchlistStr) : [];
    return of(watchlist);
  }

  addToWatchlist(movie: Movie): void {
    this.getWatchlistIds().subscribe(watchlist => {
      watchlist = watchlist.concat(movie.id);
      localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
    });
  }

  updateWatchlistStatus(movie: Movie): void {
    this.getWatchlistIds().subscribe(watchlist => {
      movie.isInWatchlist = !movie.isInWatchlist;
      if (movie.isInWatchlist) {
        watchlist = watchlist.concat(movie.id);
      } else {
        watchlist = watchlist.filter((id) => id !== movie.id);
      }
      localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
    });
  }

  removeFromWatchlist(movieId: number): void {
    let watchlist = this.getWatchlistIdsSync();
    watchlist = watchlist.filter((id) => id !== movieId);
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }

  getWatchlistIdsSync(): number[] {
    const watchlistStr = localStorage.getItem(this.watchlistKey);
    return watchlistStr ? JSON.parse(watchlistStr) : [];
  }




}
