import authenticationConstants from "@/constants/authentication.constant";
import { ReduxAction } from "@/models"

type AuthenticationRootState = {
  authenticated: boolean,
  error: string,
  loading: boolean,
}

const initialState: AuthenticationRootState = {
  authenticated: false,
  loading: false,
  error: "",
}

export function authentication(state: AuthenticationRootState = initialState, action: ReduxAction): AuthenticationRootState {
  switch (action.type) {
    case authenticationConstants.AUTH_CHECK_REQUEST:
      return {
        ...state, 
        loading: true
      }

    case authenticationConstants.AUTH_CHECK_SUCCESS:
      return {
        ...state, 
        loading: false, 
        authenticated: true
      }
      
    case authenticationConstants.AUTH_CHECK_ERROR:
      return {
        ...state, 
        loading: false,
        authenticated: false,
        error: action.payload?.error,
      }

    case authenticationConstants.AUTH_LOGIN_REQUEST:
      return {
        ...state, 
        loading: true,
      }

    case authenticationConstants.AUTH_LOGIN_SUCCESS: {
      return {
        ...state, 
        loading: false,
        authenticated: true,
      }
    }

    case authenticationConstants.AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.payload?.error,
      }
    }

    case authenticationConstants.AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case authenticationConstants.AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        authenticated: false,
      }
    }

    case authenticationConstants.AUTH_LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
        authenticated: false,
      }
    }

    case authenticationConstants.AUTH_SIGNUP_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case authenticationConstants.AUTH_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }

    case authenticationConstants.AUTH_SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      }
    }

    case authenticationConstants.AUTH_GOOGLE_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case authenticationConstants.AUTH_GOOGLE_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }

    case authenticationConstants.AUTH_GOOGLE_LOGIN_ERROR: {
      return {
        ...state, 
        loading: false,
        error: action.payload?.error,
      }
    }
      
    default: 
      return state;
  }
}