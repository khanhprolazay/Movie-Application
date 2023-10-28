import { Controller } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PatternOption } from "@app/shared";
import { MovieByDayDTO, MovieByGenresDTO, MovieByRatingDTO, MovieByYearDTO } from "../dto/movie.dto";

@Controller()
export class MovieController{
  constructor(
    private readonly movieService: MovieService
  ) {}

  @MessagePattern(PatternOption["MOVIE.GET_BY_ID"])
  async getMovieById(@Payload() id: number) {
    return await this.movieService.getById(id);
  }

  @MessagePattern(PatternOption["MOVIE.GET_BY_YEAR"])
  async getByYear(@Payload() dto: MovieByYearDTO) {
    return this.movieService.getByYear(dto);
  }

  @MessagePattern(PatternOption["MOVIE.GET_BY_GENRES"])
  async getByGenre(@Payload() dto: MovieByGenresDTO) {
    return this.movieService.getByGenres(dto);
  }

  @MessagePattern(PatternOption["MOVIE.GET_BY_RATING"]) 
  async getByRating(@Payload() dto: MovieByRatingDTO) {
    return this.movieService.getByRating(dto);
  }

  @MessagePattern(PatternOption["MOVIES.GET_BY_DAY"])
  async getByDay(@Payload() dto: MovieByDayDTO) {
    return this.movieService.getByDay(dto);
  }
}