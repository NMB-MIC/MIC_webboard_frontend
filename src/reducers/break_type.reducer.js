import {
    HTTP_BREAKTYPE_FETCHING,
    HTTP_BREAKTYPE_FAILED,
    HTTP_BREAKTYPE_SUCCESS,
  } from "../constants";

  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_BREAKTYPE_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false ,errorMessage:null};
  
      case HTTP_BREAKTYPE_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false ,errorMessage:null};
  
      case HTTP_BREAKTYPE_FAILED:
        return { ...state, result: null, isFetching: false, isError: true ,errorMessage:payload};
  
      default:
        return state;
    }
  };
  