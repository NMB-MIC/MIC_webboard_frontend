import {
  HTTP_DIVCODE_FETCHING,
  HTTP_DIVCODE_SUCCESS,
  HTTP_DIVCODE_FAILED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DIVCODE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false ,errorMessage:null};

    case HTTP_DIVCODE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false ,errorMessage:null};

    case HTTP_DIVCODE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true ,errorMessage:payload};

    default:
      return state;
  }
};
