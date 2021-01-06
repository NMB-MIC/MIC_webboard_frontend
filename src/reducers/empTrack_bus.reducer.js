import {
  HTTP_TRACKBUS_FETCHING,
  HTTP_TRACKBUS_SUCCESS,
  HTTP_TRACKBUS_FAILED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_TRACKBUS_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false ,errorMessage:null};
  
      case HTTP_TRACKBUS_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false ,errorMessage:null};
  
      case HTTP_TRACKBUS_FAILED:
        return { ...state, result: null, isFetching: false, isError: true ,errorMessage:payload};
  
      default:
        return state;
    }
  };
