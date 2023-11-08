import { ConnectedProps, InferableComponentEnhancerWithProps } from "react-redux";
import { RouterPropsType } from "./utils/withRouter";

export interface ReduxAction {
  type: string,
  payload?: Record<string, any>,
}

export type ErrorResponseType = {
  message?: string,
  error?: string,
  statusCode?: number,
}

// Auth DTO
export type RegisterDTO = {
  email: string,
  password: string,
  rePassword: string
}

export type LoginDTO = {
  email: string,
  password: string,
}

export type LoginResponseDto = {
  accessToken: string,
  refreshToken: string,
}


// Entity
export type Sex = "MALE" | "FEMALE";
export interface User {
  id: number,
  firstName?: string,
  lastName?: string,
  email: string,
  sex: Sex,
  phone?: string,
  avatar: string,
}

export interface Genre {
  id: number,
  name: string,
}


export interface Movie {
  id: number,
  title: string,
  movieLength?: number,
  rating: number,
  imageUrl: string,
  release: string,
}

export interface DetailMovie {
  id: number,
  imdbId: string,
  title: string,
  description: string,
  movieLength?: number,
  rating: number,
  trailer: string,
  imageUrl: string,
  release: string,
  plot?: string,
  banner: string,
  genres: Array[], 
  actors: Array[],
}




// Other
export type AlertType = "success" | "warning" | "error";
export interface Alert {
  id: string,
  type: AlertType,
  message: string
}