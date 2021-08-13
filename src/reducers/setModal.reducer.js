import { modal_on, modal_off } from "../constants";


const initialState = {
    isOpen: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case modal_on:
            return { ...state, isOpen: true }

        case modal_off:
            return { ...state, isOpen: false }

        default:
            return state
    }
}
