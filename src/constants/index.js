import { constant } from "lodash";

// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "NMB Covid19 command center";

// home img
export const HTTP_HOMEIMG_FETCHING = "HTTP_HOMEIMG_FETCHING";
export const HTTP_HOMEIMG_SUCCESS = "HTTP_HOMEIMG_SUCCESS";
export const HTTP_HOMEIMG_FAILED = "HTTP_HOMEIMG_FAILED";


// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";

// Break area
export const HTTP_BREAKAREA_FETCHING = "HTTP_BREAKAREA_FETCHING";
export const HTTP_BREAKAREA_SUCCESS = "HTTP_BREAKAREA_SUCCESS";
export const HTTP_BREAKAREA_FAILED = "HTTP_BREAKAREA_FAILED";

// Break type
export const HTTP_BREAKTYPE_FETCHING = "HTTP_BREAKTYPE_FETCHING";
export const HTTP_BREAKTYPE_SUCCESS = "HTTP_BREAKTYPE_SUCCESS";
export const HTTP_BREAKTYPE_FAILED = "HTTP_BREAKTYPE_FAILED";

// Alert mail
export const HTTP_ALERTMAIL_FETCHING = "HTTP_ALERTMAIL_FETCHING";
export const HTTP_ALERTMAIL_SUCCESS = "HTTP_ALERTMAIL_SUCCESS";
export const HTTP_ALERTMAIL_FAILED = "HTTP_ALERTMAIL_FAILED";

// Emp_tracking_bus
export const HTTP_TRACKBUS_FETCHING = "HTTP_TRACKBUS_FETCHING";
export const HTTP_TRACKBUS_SUCCESS = "HTTP_TRACKBUS_SUCCESS";
export const HTTP_TRACKBUS_FAILED = "HTTP_TRACKBUS_FAILED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

export const apiUrl = "http://54.255.187.109:2009/api/v1/";
export const imageUrl = "http://54.255.187.109:2009/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_URL: `authen/login`,
  REGISTER_URL: `manage_user/register`,
  USER_URL: `manage_user/user`,
  VERIFY_EMAIL_URL: `manage_user/verifyEmail`,
  DIVISIONCODE_URL: `manage_master/division`,
  GROUP_PLANT_URL: `qr_covid19/GroupPlant`,
  EMP_TRACK_BUS_URL: `qr_covid19/empTrackBus`,
  EMP_TRACK_BREAK_URL: `qr_covid19/empTrackBreak`,
  BREAK_AREA_URL: `master_covid19/break_area`,
  BREAK_TYPE_URL: `master_covid19/break_type`,
  CHECK_IN_REPORT_URL: `qr_covid19/TotalCheckIn`,
  BUS_CHECK_IN_REPORT_URL: `qr_covid19/busCheckIn`,
  BREAK_CHECK_IN_REPORT_URL: `qr_covid19/breakCheckIn`,
  WEB_REGISTER_URL: `qr_covid19/WebRegister`,
  BODY_TEMP_URL: `body_temperature/body_temperature`,
  ALERT_MAIL_URL: `master_covid19/alert_mail`,
  TRACK_BUS_PLATE_URL: `qr_covid19/TrackBusPlate`,
  PERCENT_REGISTER_PLANT_URL: `qr_covid19/PercentRegisterByPlant`,
  PERCENT_REGISTER_DIVISION_URL: `qr_covid19/PercentRegisterByDivision`,
  TOTAL_MAN_COUNT_URL: `body_temperature/emp_count`,
  BODY_TEMP_EX_URL: `body_temperature/body_temperature_ex`,
  BODY_TEMP_MISSING_EX_URL: `body_temperature/body_temperature_missing_ex`,
  BODY_TEMP_OVER_EX_URL: `body_temperature/body_temperature_over_ex`,
  ALL_MANPOWER_URL:`body_temperature/all_manpower_ex`,
  BUS_CHECK_IN_PERCENTAGE_URL: `qr_covid19/BusCheckInPercent`,
  BREAK_CHECK_IN_PERCENTAGE_URL: `qr_covid19/BreakCheckInPercent`,
  CHECK_IN_PERCENTAGE_URL: `qr_covid19/CheckInPercent`,
  HOME_IMAGE_URL: `home_image/home_image`,
  NO_SCAN_REPORT_URL: `qr_covid19/noScanReport`
};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TEMP_EMP: "TEMP_EMP",
};
