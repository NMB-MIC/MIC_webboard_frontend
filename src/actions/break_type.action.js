import {
    HTTP_BREAKTYPE_FETCHING,
    HTTP_BREAKTYPE_FAILED,
    HTTP_BREAKTYPE_SUCCESS,
    server,
    OK,
  } from "../constants";
  import { httpClient } from "./../utils/HttpClient";
  
  export const setStateToFetching = () => ({
    type: HTTP_BREAKTYPE_FETCHING,
  });
  
  export const setStateToSuccess = (payload) => ({
    type: HTTP_BREAKTYPE_SUCCESS,
    payload,
  });
  
  export const setStateToFailed = (payload) => ({
    type: HTTP_BREAKTYPE_FAILED,
    payload,
  });
  
  const doGetBreakTYPE = (dispatch) => {
    httpClient
      .get(server.BREAK_TYPE_URL)
      .then((result) => {
        //alert(JSON.stringify(result.data))
        dispatch(setStateToSuccess(result.data));
      })
      .catch((error) => {
        alert(error);
        dispatch(setStateToFailed());
      });
  };
  
  export const getBreakTYPE = () => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
      doGetBreakTYPE(dispatch);
    };
  };
  
  export const deleteBreakTYPE = (break_TYPE_code) => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
      await httpClient.delete(server.BREAK_TYPE_URL, {
        data: { break_TYPE_code },
      });
      doGetBreakTYPE(dispatch);
    };
  };
  
  export const createBreakTYPE = (history, break_TYPE) => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
      if (break_TYPE.break_TYPE_code.length !== 3  ) {
        dispatch(setStateToFailed("break_TYPE_code lenght should be 3"));
        return;
      }
  
      try {
        let resultBackend = await httpClient.post(
          server.BREAK_TYPE_URL,
          break_TYPE
        );
        if (resultBackend.data.message === OK) {
          dispatch(setStateToSuccess(resultBackend.data.result));
          history.goBack();
        } else {
          // alert(JSON.stringify(resultBackend.data.error) );
          dispatch(setStateToFailed("backend error"));
        }
      } catch (error) {
        dispatch(setStateToFailed(JSON.stringify(error)));
      }
    };
  };
  
  export const getBreakTYPEByKeyword = (event) => {
    return (dispatch) => {
      var keyword = event.target.value;
      dispatch(setStateToFetching());
  
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.BREAK_TYPE_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetBreakTYPE(dispatch);
      }
    };
  };
  