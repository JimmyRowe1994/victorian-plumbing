import { AnyAction } from "@reduxjs/toolkit";

import types from "../types";

const initState = {
    category: 'basins',
    paginationNumber: 0,
    paginationInfo: {
        from: 0,
        size: 0,
        sortType: 1,
        total: 0,
    },
    sortBy: 1,
}

export const filtersReducer = (state = initState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case types.SET_CATEGORY:
            return {
                ...state,
                category: payload,
            }
        case types.SET_PAGINATION_INFO:
            return {
                ...state,
                paginationInfo: payload,
            }
        case types.SET_PAGINATION_NUMBER:
            return {
                ...state,
                paginationNumber: payload,
            }
        case types.SET_SORT_BY:
            return {
                ...state,
                sortBy: payload,
            }

        default:
            return state;
    }
}