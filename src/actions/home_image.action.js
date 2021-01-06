import {
    HTTP_HOMEIMG_FETCHING,
    HTTP_HOMEIMG_SUCCESS,
    HTTP_HOMEIMG_FAILED,
    server,
    OK,
  } from "../constants";
  import { httpClient } from "./../utils/HttpClient";
  
  export const setHomeImgStateToFetching = () => ({
    type: HTTP_HOMEIMG_FETCHING,
  });
  
  export const setHomeImgstateToSuccess = (payload) => ({
    type: HTTP_HOMEIMG_SUCCESS,
    payload,
  });
  
  export const setHomeImgstateToFailed = (payload) => ({
    type: HTTP_HOMEIMG_FAILED,
    payload: payload,
  });
  
  const doGetHomeImg = (dispatch) => {
    httpClient
      .get(server.HOME_IMAGE_URL)
      .then((result) => {
        //alert(JSON.stringify(result.data))
        dispatch(setHomeImgstateToSuccess(result.data));
      })
      .catch((error) => {
        alert(error);
        dispatch(setHomeImgstateToFailed(error));
      });
  };

  export const getHomeImg = () => {
    return async (dispatch) => {
      dispatch(setHomeImgStateToFetching());
      doGetHomeImg(dispatch);
    };
  };
  