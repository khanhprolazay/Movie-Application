import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, Actor, Genre, Movie, Video, Service, CastToMovie, DirectorToMovie, WriterToMovie, Budget, OpeningWeekendGross, MovieToGenre, Currency, Keyword, MovieToKeyword } from '@app/shared';

@Module({
  imports: [
    LoggerModule,
    MovieModule,
    GenreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: Service.MOVIE,
      useFactory: (configService: ConfigService) => ({ 
          name: "movie-connection",
          type: "mysql",
          entities: [Movie, Actor, Genre, Video, Currency, Budget, Keyword, MovieToKeyword, CastToMovie, MovieToGenre, DirectorToMovie, WriterToMovie,  OpeningWeekendGross],
          host: configService.get('MOVIE_DATABASE_HOST'),
          port: configService.get('MOVIE_DATABASE_PORT'),
          database: configService.get('MOVIE_DATABASE_NAME'),
          username: configService.get('MOVIE_DATABASE_USER_USERNAME'),
          password: configService.get('MOVIE_DATABASE_USER_PASSWORD'),
          // synchronize: true,
          dropSchema: false,
          ssl: configService.get('NODE_ENV') === 'production' && {
            rejectUnauthorized: true,
            ca: [fs.readFileSync("config/ca/DigiCertGlobalRootCA.crt.pem", "utf8")],
          }
      })
    }),
  ],
})
export class AppModule {}
