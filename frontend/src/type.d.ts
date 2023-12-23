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
  name: string,
}


export interface Movie {
  id: number,
  title: string,
  rating: number,
  imageUrl: string,
  release: string,
  posterPath?: string,
  movieLength?: number,
  backdropPath?: string,
  genres: { id: number, genre: Genre }[], 
}

export interface Video {
  name: string;
  key: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
}

export interface Actor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Cast {
  role: string;
  actor: Actor;
}

export interface DetailMovie {
  id: number,
  imdbId: string,
  title: string,
  rating: number,
  description?: string,
  movieLength?: number,
  videos: Video[],
  imageUrl: string,
  release?: string,
  plot?: string,
  banner: string,
  posterPath?: string,
  backdropPath?: string,
  genres: { id: number, genre: Genre }[], 
  casts: Cast[],
  directors: {actorId: string, actor: Actor}[],
}

// Other
export type AlertType = "success" | "warning" | "error";
export interface Alert {
  id: string,
  type: AlertType,
  message: string
}

export interface PaginationModel {
  pagination: {
    currentPage: number
    totalEntries: number
    totalPage: number
  }
}

export interface Report extends PaginationModel {
  message: string
  data: ReportModel[]
}

export interface ReportResponse {
  message: string
  data: ReportModel
}

export interface App extends PaginationModel {
  message: string
  data: AppModel[]
}

export interface AppResponse extends PaginationModel {
  message: string
  data: AppModel
}

export interface ReportModel {
  active: number
  company: string
  count: number
  createdAt: string
  email: string
  expiredDate: string
  id: string
  isActived: boolean
  isOwner: boolean
  pbi: string
  pdf: string
  plan: number
  reportMethod: number
  shared: number
  sharedReportCount: number
  startedDate: string
  title: string
  updatedAt: string
  userId: string
  userName: string
  workspaceId: number
  workspaceName: string
  sharingUsers: any[]
  advanceOptions?: {
    navbar?: boolean
    filterPane?: boolean
    bookmark?: boolean
    print?: boolean
  }
  filters: any
  embedUrl?: string
}

export interface AppModel {
  id: number
  name: string
  description: string
  emails: string[]
  reportIds: number[]
  reports: ReportModel[]
  groups: GroupModel[]
  updatedAt: string
  createdAt: string
  logo?: string
  reportConfigs: EmbedReportConfig[]
}

interface GroupModel {
  id: number
  name: string
  emails: string[]
  reportIds: number[]
  updatedAt: string
  createdAt: string
}

export interface EmbedReportConfig {
  tokenId?: string
  accessToken?: string
  tokenExpiry?: string
  reportConfig?: ReportConfig[]
  errorMsg?: string
}

interface ReportConfig {
  reportId: string
  reportName: string
  embedUrl: string
  datasetId: any
}
