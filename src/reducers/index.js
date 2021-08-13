import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import divcodeReducer from "./division_code.reducer";
import setModalReducer from "./setModal.reducer";
import micJobReducer from "./micJobs.reducer";

import { combineReducers } from "redux";
 
export default combineReducers({
  registerReducer,
  loginReducer,
  appReducer,
  divcodeReducer,
  setModalReducer, 
  micJobReducer,
});
