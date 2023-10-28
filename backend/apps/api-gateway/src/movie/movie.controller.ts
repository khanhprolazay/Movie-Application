import { Controller, DefaultValuePipe, Get, Inject, OnModuleInit, Param, ParseArrayPipe, ParseIntPipe, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Pattern, Service } from "@app/shared";
import { ClientKafka } from "@nestjs/microservices";

@Controller("movies")
export class MovieController implements OnModuleInit {
  constructor( 
    @Inject(Service.MOVIE) 
    private readonly movieClient: ClientKafka, 
    private readonly movieService: MovieService,
  ) {}

  async onModuleInit() {
    const patterns: Pattern[] = ["MOVIE.GET_BY_ID", "MOVIE.GET_BY_YEAR", "GENRE.GET_ALL", "MOVIE.GET_BY_RATING", "MOVIE.GET_BY_GENRES", "MOVIES.GET_BY_DAY"];
    patterns.forEach(pattenrn => this.movieClient.subscribeToResponseOf(pattenrn));
    await this.movieClient.connect();
  }

  @Get("byYear")
  async getByYear(
    @Query("year", ParseIntPipe) year: number,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByYear(year, skip, limit);
  }

  @Get("byGenres")
  async getByGenres(
    @Query("genres", new ParseArrayPipe({ items: String, separator: ","})) genres: string[],
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByGenres(genres, skip, limit);
  }

  @Get("byRating")
  async getByRating(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByRating(skip, limit);
  }

  @Get("byDay")
  async getByDay(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByDay(skip, limit);
  }


  @Get("byId/:id")
  async getMovieById(@Param("id", ParseIntPipe) id: number) {
    return await this.movieService.getById(id);
  }

  @Get("genres")
  async getGenres() {
    return await this.movieService.getGenres();
  }
}