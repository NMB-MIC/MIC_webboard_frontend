import { HTTP_REGISTER_FETCHING, HTTP_REGISTER_SUCCESS, HTTP_REGISTER_FAILED } from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage:null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_REGISTER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false ,errorMessage:null};

    case HTTP_REGISTER_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false ,errorMessage:null};

    case HTTP_REGISTER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true ,errorMessage:payload};

    default:
      return state;
  }
};
