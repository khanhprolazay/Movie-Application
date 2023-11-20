import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { Trailer } from "./trailer.entity";
import { WriterToMovie } from "./writer-to-movie.entity";
import { CastToMovie } from "./cast-to-movie.entity";
import { DirectorToMovie } from "./director-to-movie.entity";
import { OpeningWeekendGross } from "./opening-weekend-gross.entity";
import { MovieToGenre } from "./movie-to-genre.entity";
import { Budget } from "./budget.entity";
import { MovieToKeyword } from "./movie-to-keyword.entity";

@Entity({name: "movie"})
export class Movie extends BaseEntity {
  @Column({ unique: true, length: '20' })
  imdbId: string

  @Column({ length: 100 })
  title: string

  @Column({type: "double", nullable: true})
  rating: number

  @Column({ type: "int", nullable: true})
  voteCount: number

  @Column({ type: "double", nullable: true })
  movieLength: number

  @Column({ type: "text", nullable: true })
  imageUrl: string

  @Column({type: 'date', nullable: true})
  release: Date

  @Column({nullable: true})
  tagline: string

  @Column({nullable: true})
  posterPath: string

  @Column({nullable: true}) 
  backdropPath: string

  @Column({ type: 'text', nullable: true })
  plot: string

  @Column({type: 'text', nullable: true})
  description: string

  @OneToMany(() => MovieToGenre, movieToGenre => movieToGenre.movie)
  genres: MovieToGenre[]

  @OneToMany(() => MovieToKeyword, movieToKeyword => movieToKeyword.movie)
  keywords: MovieToKeyword[]

  @OneToMany(() => CastToMovie, castToMovie => castToMovie.movie)
  casts: CastToMovie[]

  @OneToMany(() => WriterToMovie, writerToMovie => writerToMovie.movie)
  writers: WriterToMovie[]

  @OneToMany(() => DirectorToMovie, directorToMovie => directorToMovie.movie)
  directors: DirectorToMovie[]

  @OneToMany(() => Trailer, trailer => trailer.movie)
  trailers: Trailer[]

  @OneToOne(() => Budget, { nullable: true })
  @JoinColumn()
  productionBudget: Budget

  @OneToOne(() => Budget, { nullable: true })
  @JoinColumn()
  lifetimeGross: Budget  

  @OneToOne(() => OpeningWeekendGross, { nullable: true })
  @JoinColumn()
  openingWeekendGross: OpeningWeekendGross

  @OneToOne(() => Budget, { nullable: true })
  @JoinColumn()
  worldwideGross: Budget
}