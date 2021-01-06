import {
  HTTP_BREAKAREA_FETCHING,
  HTTP_BREAKAREA_FAILED,
  HTTP_BREAKAREA_SUCCESS,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setStateToFetching = () => ({
  type: HTTP_BREAKAREA_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_BREAKAREA_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_BREAKAREA_FAILED,
  payload,
});

const doGetBreakArea = (dispatch) => {
  httpClient
    .get(server.BREAK_AREA_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      alert(error);
      dispatch(setStateToFailed());
    });
};

export const getBreakArea = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetBreakArea(dispatch);
  };
};

export const deleteBreakArea = (break_area_code) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    await httpClient.delete(server.BREAK_AREA_URL, {
      data: { break_area_code },
    });
    doGetBreakArea(dispatch);
  };
};

export const createBreakArea = (history, break_area) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (break_area.break_area_code.length !== 2  ) {
      dispatch(setStateToFailed("break_area_code lenght should be 2"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.BREAK_AREA_URL,
        break_area
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

export const getBreakAreaByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());

    if (keyword !== null && keyword !== "") {
      httpClient
        .get(`${server.BREAK_AREA_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateToSuccess(result.data));
        });
    } else {
      doGetBreakArea(dispatch);
    }
  };
};
