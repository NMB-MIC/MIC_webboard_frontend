// Login Page
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "MMS Project";


// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";


// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK' 

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = 'Cannot connect to server, Please try again.' 
export const NETWORK_TIMEOUT_MESSAGE = 'A network timeout has occurred, Please try again.'  
export const UPLOAD_PHOTO_FAIL_MESSAGE = 'An error has occurred. The photo was unable to upload.' 


// export const apiUrl =  "http://localhost:5010/api";
// export const api_Influx = "http://10.128.16.210:4012";

export const apiUrl =  "http://localhost:5011/api";
export const api_Influx = "http://localhost:4012";

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'



export const MQTT_PATH = {
  ADDRESS_1885: "mqtt://localhost:1885",
  ADDRESS_GD_1885: "mqtt://192.168.1.128:1885",
};

export const key = {
    LOGIN_PASSED: `LOGIN_PASSED`,
    API_KEY: `API_KEY`,
    USER_LV: `USER_LV`,
    USER_NAME: "USER_NAME",
    USER_EMP: "USER_EMP",
  };
  
  // gitfgdfsxcdsfsd dfgesfg
export const server = {    
    LOGIN_URL : `authen/login`, 
    URL_REGIST:    `authen/register`,   
    LOGIN_PASSED : `yes`,
    xbar_URL :  `api_spc/get_xbar`,
  
    STATE1_URL: "api_spc/state1", 
    STATE2_URL: "api_spc/state2", 
    MasterModel_URL: "api_spc/MasterModel", //xbarChart
    MasterPara_URL: "api_spc/MasterPara", //xbarChart
    MasterParaSingle_URL: "api_spc/MasterParaSingle", //xbarChart
    MasterLine_URL: "api_spc/MasterLine", //xbarChart
    MasterPart_URL: "api_spc/MasterPart", //xbarChart


 


    // master_machine: `api_counter/master_MC`,
   
    
   
    // AlarmTopic_time_TB: `api_nhtGrinding/AlarmTopic_time`,
    
    // Alarm_Non_Operating_GD: `api_nhtGrinding/MC_Status_All`, // show % non and operating
    // MC_by_status_GD: `api_nhtGrinding/mc_by_status`, // show % non and operating
    // MC_status_daily_GD: `api_nhtGrinding/count_mc_status_daily_GD`, // show count daily by mc
    // MMS_GD_ICB:`api_nhtGrinding/mms_counter_ICB`, 

    
  
  }