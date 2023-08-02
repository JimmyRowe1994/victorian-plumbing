import { Dispatch } from "@reduxjs/toolkit";

import types from "../types";

interface Pagination {
    from: number;
    size: number;
    sortBy: number;
    total: number;
}

export const setCategory = (payload: string) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_CATEGORY,
        payload
    })
}

export const setPaginationInfo = (payload: Pagination) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PAGINATION_INFO,
        payload,
    })
}

export const setPaginationNumber = (payload: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PAGINATION_NUMBER,
        payload,
    })
}

export const setSortBy = (payload: number) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_SORT_BY,
        payload
    })
}