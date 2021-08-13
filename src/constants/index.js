// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "MIC_JobProgressive";

// home img
export const HTTP_HOMEIMG_FETCHING = "HTTP_HOMEIMG_FETCHING";
export const HTTP_HOMEIMG_SUCCESS = "HTTP_HOMEIMG_SUCCESS";
export const HTTP_HOMEIMG_FAILED = "HTTP_HOMEIMG_FAILED";


// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// modal
export const modal_on = "modal_on";
export const modal_off = "modal_off";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";

// Break area
export const HTTP_MIC_JOBS_FETCHING = "HTTP_MIC_JOBS_FETCHING";
export const HTTP_MIC_JOBS_SUCCESS = "HTTP_MIC_JOBS_SUCCESS";
export const HTTP_MIC_JOBS_FAILED = "HTTP_MIC_JOBS_FAILED";

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

// export const apiUrl = "http://10.121.1.123:9001/api/mic_jobProgressive/";
export const apiUrl = "http://localhost:9001/api/mic_jobProgressive/";


export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_URL: `authen/login`,
  REGISTER_URL: `authen/register`,
  FORGOT_PASSWORD_URL: `authen/forgot`,
  USER_URL: `manage_user/user`,
  CHANGE_LV_URL:'manage_user/changeLevel',
  FIND_USER_URL: 'manage_user/find_user',
  VERIFY_EMAIL_URL: `authen/verifyEmail`,
  DIVISIONCODE_URL: `manage_master/division`,
  DIVISIONNAME_URL: `manage_master/divisionName`,
  MIC_JOB_URL: 'Jobs/mic_job',
  MIC_JOB_APPROVED_URL: 'Jobs/mic_job_approve',
  P_CHART_URL:'qc_control_chart/dynamic_pchart',
  JOB_PROCESS_URL:'manage_master/jobs_process_master',
  JOB_SCORE_URL:'Jobs/job_score',
  JOB_PROGRESSIVE_URL:'JobProgressive/jobProgressive',
  AllianceWebsite_URL: 'alliance_website/allianceWebsite',
};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TEMP_EMP: "TEMP_EMP",
  TOKEN: "TOKEN",
};
