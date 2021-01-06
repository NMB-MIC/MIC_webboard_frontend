import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import divcodeReducer from "./division_code.reducer";
import breakAreaReducer from "./break_area.reducer";
import breakTypeReducer from "./break_type.reducer";
import alertMailReducer from "./alert_mail.reducer";
import homeImgReducer from "./home_img.reducer";

import { combineReducers } from "redux";

export default combineReducers({
  registerReducer,
  loginReducer,
  appReducer,
  divcodeReducer,
  breakAreaReducer,
  breakTypeReducer,
  alertMailReducer,
  homeImgReducer,
});
