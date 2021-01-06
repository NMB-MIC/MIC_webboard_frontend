import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  server,
  key,
  OK,
  YES,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});

export const setLoginStateToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload: payload,
});

export const autoLogin = (history) => {
  return () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      setTimeout(() => history.push("/home"), 100);
    }
  };
};

export const login = (history, credential) => {
  return async (dispatch, getState) => {
    dispatch(setLoginStateToFetching());
    try {
      let resultBackend = await httpClient.post(server.LOGIN_URL, credential);
      if (resultBackend.data.message === OK) {
        localStorage.setItem(key.LOGIN_PASSED, YES);
        localStorage.setItem(key.USER_NAME, resultBackend.data.result.username);
        localStorage.setItem(key.USER_EMP, resultBackend.data.result.empNumber);
        localStorage.setItem(key.API_KEY, resultBackend.data.result.randomKey);
        localStorage.setItem(key.USER_LV, resultBackend.data.result.levelUser);
        getState().appReducer.app.forceUpdate();

        dispatch(setLoginStateToSuccess(resultBackend));
        window.location.replace("../home");
        // history.push("/home");
      } else {
        dispatch(setLoginStateToFailed());
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoginStateToFailed());
    }
  };
};
