import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Genre, Movie, PatternOption, Service } from "@app/shared";
import { BaseMessageService } from "../base";

@Injectable()
export class MovieService extends BaseMessageService<Movie> {
  constructor(
    @Inject(Service.MOVIE) protected readonly movieClient: ClientKafka,
  ) {
    super(movieClient, "MOVIE");
  }

  async getByYear(year: number, skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_YEAR"], { skip, limit, year });
  }

  async getByRating(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_RATING"], { skip, limit });
  }

  async getByGenres(genres: string[], skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_GENRES"], { genres, skip, limit });
  }

  async getByDay(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_DAY"], { skip, limit });
  }

  async getGenres() {
    return await this.executeMany<Genre>(PatternOption["GENRE.GET_ALL"], {});
  }

  async getByUpcoming(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_UPCOMING"], { skip, limit })
  }

  async getBySearch(search: string, skip, limit) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_SEARCH"], { search, skip, limit });
  }

}