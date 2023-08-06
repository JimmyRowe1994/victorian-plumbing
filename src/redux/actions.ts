import { Dispatch } from "@reduxjs/toolkit";
import { Pagination, SelectedFilters } from "../types";
import { RootState } from "../store";

import types from "./types";



export const setCategory = (payload: string) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_CATEGORY,
        payload
    })
}

export const setFacets = (payload: Array<object>) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_FACETS,
        payload
    })
}

export const setPagination = (payload: Pagination) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PAGINATION,
        payload,
    })
}

export const setPaginationNumber = (payload: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PAGINATION_NUMBER,
        payload,
    })
}

export const setProducts = (payload: Array<object>) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PRODUCTS,
        payload,
    })
}

export const setProductView = (payload: 'grid' | 'list') => async (dispatch: Dispatch) => {
    dispatch({
        type: types.SET_PRODUCT_VIEW,
        payload,
    })
}

export const setSelectedFilters = (payload: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    const selectedFilters: SelectedFilters = { ...getState().data.selectedFilters, ...payload };

    // Filter out any empty facets as they can't be sent to the API
    const adjustedSelectedFilters = Object.fromEntries(Object.entries(selectedFilters).filter(([_, value]) => value.length > 0));

    dispatch({
        type: types.SET_SELECTED_FILTERS,
        payload: adjustedSelectedFilters,
    })

    // Reset the pagination in case the current pagination is beyond the new results total
    dispatch({
        type: types.SET_PAGINATION_NUMBER,
        payload: 1,
    })
};

export const setSortType = (payload: number) => async(dispatch: Dispatch) => {
    dispatch({
        type: types.SET_SORT_TYPE,
        payload
    })
}
