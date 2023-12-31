import movieService from "@/services/movie.service";
import genreConstants from "@/constants/genre.constant";
import { TypedDispatch } from "@/redux/store";
import { Genre, ReduxAction } from "@/models";

function getGenres() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    movieService
      .getGenres()
      .then((data) => dispatch(success(data)))
      .catch((err) => dispatch(error(err)));

    function request(): ReduxAction {
      return {
        type: genreConstants.GET_GENRES,
      };
    }

    function success(genres: Genre[]): ReduxAction {
      return {
        type: genreConstants.GET_GENRES_SUCCESS,
        payload: { genres },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: genreConstants.GET_GENRES_ERROR,
        payload: { error },
      };
    }
  };
}

const genreActions = { getGenres };
export default genreActions;
