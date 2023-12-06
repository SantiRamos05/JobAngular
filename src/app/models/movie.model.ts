// movie.model.ts

export interface Movie {
  id: number;
  Title: string;
  Description: string;
  Rating: number;
  Duration: string;
  Genre: string;
  image: string;
  isInWatchlist?: boolean;

}
