import { modal_on, modal_off } from "../constants";

export const set_modal_on = () => ({
    type: modal_on,
})

export const set_modal_off = () => ({
    type: modal_off,
})

export const set_modal = (condition) => {
    return async (dispatch) => {
        if (condition) {
            dispatch(set_modal_on());
        } else {
            dispatch(set_modal_off());
        }
    }
}