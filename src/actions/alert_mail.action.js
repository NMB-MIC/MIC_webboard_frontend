import {
  HTTP_ALERTMAIL_FETCHING,
  HTTP_ALERTMAIL_FAILED,
  HTTP_ALERTMAIL_SUCCESS,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setStateToFetching = () => ({
  type: HTTP_ALERTMAIL_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_ALERTMAIL_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_ALERTMAIL_FAILED,
  payload,
});

const doGetAlertMail = (dispatch) => {
  httpClient
    .get(server.ALERT_MAIL_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      alert(error);
      dispatch(setStateToFailed());
    });
};

export const getAlertMail = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetAlertMail(dispatch);
  };
};

export const deleteAlertEmail = (ALERT_MAIL) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    await httpClient.delete(server.ALERT_MAIL_URL, { data: ALERT_MAIL });
    doGetAlertMail(dispatch);
  };
};

export const createAlertEmail = (history, ALERT_MAIL) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());

    try {
      let resultBackend = await httpClient.post(
        server.ALERT_MAIL_URL,
        ALERT_MAIL
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

export const getAlertMailByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());

    if (keyword !== null && keyword !== "") {
      httpClient
        .get(`${server.ALERT_MAIL_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateToSuccess(result.data));
        });
    } else {
      doGetAlertMail(dispatch);
    }
  };
};
