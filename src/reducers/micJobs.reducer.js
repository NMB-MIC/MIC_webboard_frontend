import { HTTP_MIC_JOBS_FETCHING, HTTP_MIC_JOBS_SUCCESS, HTTP_MIC_JOBS_FAILED } from "../constants";

const initialState = {
    result: null,
    isFetching: true,
    isError: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HTTP_MIC_JOBS_FETCHING:
            return { ...state, result: null, isFetching: true, isError: false };

        case HTTP_MIC_JOBS_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false };

        case HTTP_MIC_JOBS_FAILED:
            return { ...state, result: null, isFetching: false, isError: true };

        default:
            return state;
    }
};
