import {
  APP_INIT
} from "../constants";



export const setApp = (app) => {
  return dispatch => {
    dispatch(
      {
        type: APP_INIT,
        payload: app
      }
    );  
  };
};