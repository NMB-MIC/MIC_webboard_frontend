import {
    HTTP_BREAKAREA_FETCHING,
    HTTP_BREAKAREA_FAILED,
    HTTP_BREAKAREA_SUCCESS,
  } from "../constants";

  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_BREAKAREA_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false ,errorMessage:null};
  
      case HTTP_BREAKAREA_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false ,errorMessage:null};
  
      case HTTP_BREAKAREA_FAILED:
        return { ...state, result: null, isFetching: false, isError: true ,errorMessage:payload};
  
      default:
        return state;
    }
  };
  