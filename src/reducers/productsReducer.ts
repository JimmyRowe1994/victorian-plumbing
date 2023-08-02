import { AnyAction } from "@reduxjs/toolkit";

import types from "../types";

const initState = {
    listings: []
}

export const productsReducer = (state = initState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case types.SET_PRODUCTS:
            return {
                ...state,
                listings: payload,
            }

        default:
            return state;
    }
}