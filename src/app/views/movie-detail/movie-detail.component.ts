import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movies: any;
  trailerUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      this.movieService.getMovieById(movieId).subscribe(movie => {
        this.movies = movie;
        this.trailerUrl = this.getVideoEmbedLink(movie['Trailer Link']);
        let watchlistIds = this.movieService.getWatchlistIdsSync();
        this.movies.isInWatchlist = watchlistIds.includes(movie.id);
        console.log(movie);
      });
    });
  }

  getVideoEmbedLink(link: string): SafeResourceUrl {
    const videoCode = this.extractVideoCode(link);
    const embedUrl = `https://www.youtube.com/embed/${videoCode}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractVideoCode(link: string): string {
    const match = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }

  toggleWatchlist(): void {
    this.movieService.updateWatchlistStatus(this.movies);
  }
}
