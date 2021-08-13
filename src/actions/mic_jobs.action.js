import {
    HTTP_MIC_JOBS_FETCHING,
    HTTP_MIC_JOBS_SUCCESS,
    HTTP_MIC_JOBS_FAILED,
    server,
    key,
    OK,
    YES,
} from "../constants";
import { httpClient } from "../utils/HttpClient";


export const setStateToFetching = () => ({
    type: HTTP_MIC_JOBS_FETCHING,
});

export const setStateToSuccess = (payload) => ({
    type: HTTP_MIC_JOBS_SUCCESS,
    payload,
});

export const setStateToFailed = () => ({
    type: HTTP_MIC_JOBS_FAILED,
});

export const doGetJobs = (status) => {
    return async (dispatch) => {
        dispatch(setStateToFetching());

        try {
            let response = await httpClient.get(server.MIC_JOB_URL + '/' + status)
            if (response.data.api_result === OK) {
                dispatch(setStateToSuccess(response.data.result));
            }
        } catch (error) {
            dispatch(setStateToFailed())
        }

    }
}