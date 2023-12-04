import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'assets/movies.json';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesUrl);
  }
}
