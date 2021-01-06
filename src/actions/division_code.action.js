import {
  HTTP_DIVCODE_FETCHING,
  HTTP_DIVCODE_FAILED,
  HTTP_DIVCODE_SUCCESS,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setDivCodeStateToFetching = () => ({
  type: HTTP_DIVCODE_FETCHING,
});

export const setDivCodestateToSuccess = (payload) => ({
  type: HTTP_DIVCODE_SUCCESS,
  payload,
});

export const setDivCodestateToFailed = (payload) => ({
  type: HTTP_DIVCODE_FAILED,
  payload: payload,
});

const doGetDivCode = (dispatch) => {
  httpClient
    .get(server.DIVISIONCODE_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setDivCodestateToSuccess(result.data));
    })
    .catch((error) => {
      alert(error);
      dispatch(setDivCodestateToFailed());
    });
};

export const getDivCode = () => {
  return async (dispatch) => {
    dispatch(setDivCodeStateToFetching());
    doGetDivCode(dispatch);
  };
};

export const deleteDivision = (divCode) => {
  return async (dispatch) => {
    dispatch(setDivCodeStateToFetching());
    await httpClient.delete(server.DIVISIONCODE_URL, {
      data: { divisionCode: divCode },
    });
    doGetDivCode(dispatch);
  };
};

export const createDivCode = (history, divisionCodeData) => {
  
  return async (dispatch) => {
    dispatch(setDivCodeStateToFetching());
    if (divisionCodeData.divisionCode.length < 4) {
      dispatch(setDivCodestateToFailed("divisionCode lenght should be 4"));
      return;
    }

    try {
      
      let resultBackend = await httpClient.post(
        server.DIVISIONCODE_URL,
        divisionCodeData
      );
      if (resultBackend.data.message === OK) {
        dispatch(setDivCodestateToSuccess(resultBackend.data.result));
        history.goBack();
      } else {
        // alert(JSON.stringify(resultBackend.data.error) );
        dispatch(setDivCodestateToFailed("backend error"));
      }
    } catch (error) {
      dispatch(setDivCodestateToFailed(JSON.stringify(error)));
    }
    
  };
};

export const getProductByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setDivCodeStateToFetching());

    if (keyword !== null && keyword !== "") {
      httpClient
        .get(`${server.DIVISIONCODE_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setDivCodestateToSuccess(result.data));
        });
    } else {
      doGetDivCode(dispatch);
    }
  };
};
