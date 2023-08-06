import { AnyAction } from "@reduxjs/toolkit";

import types from "./types";
import { Facet, Pagination, SelectedFilters } from "../types";

interface InitialState {
    category: string;
    facets: Array<Facet>;
    pagination: Pagination;
    paginationNumber: number;
    products: Array<object>;
    productView: 'grid' | 'list';
    selectedFilters: SelectedFilters;
    sortType: 1 | 2 | 3 | 4;
}

const initialState: InitialState = {
    category: 'basins',
    facets: [],
    pagination: {
        from: 0,
        size: 0,
        sortType: 1,
        total: 0,
    },
    paginationNumber: 1,
    products: [],
    productView: 'grid',
    selectedFilters: {},
    sortType: 1,
}

export const reducer = (state: InitialState = initialState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case types.SET_CATEGORY: {
            return {
                ...state,
                category: payload,
            }
        }
        case types.SET_FACETS: {
            return {
                ...state,
                facets: payload,
            }
        }
        case types.SET_PAGINATION: {
            return {
                ...state,
                pagination: payload,
            }
        }
        case types.SET_PAGINATION_NUMBER: {
            return {
                ...state,
                paginationNumber: payload,
            }
        }
        case types.SET_PRODUCT_VIEW: {
            return {
                ...state,
                productView: payload,
            }
        }
        case types.SET_PRODUCTS: {
            return {
                ...state,
                products: payload,
            }
        }
        case types.SET_SELECTED_FILTERS: {
            return {
                ...state,
                selectedFilters: payload,
            }
        }
        case types.SET_SORT_TYPE: {
            return {
                ...state,
                sortType: payload,
            }
        }
        default: {
            return state;
        }
    }
}