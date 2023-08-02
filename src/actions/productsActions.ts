import { Dispatch } from "@reduxjs/toolkit";

import types from "../types";

export const setProducts = (payload: Array<object>) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PRODUCTS,
        payload
    })
}