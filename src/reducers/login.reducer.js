import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  error:null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_LOGIN_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false ,error:null};

    case HTTP_LOGIN_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false ,error:null};

    case HTTP_LOGIN_FAILED:
      return { ...state, result: null, isFetching: false, isError: true ,error:payload};

    default:
      return state;
  }
};
