export interface Facet {
    displayName: string;
    identifier: string;
    options: Array<FilterOption>;
}

export interface FilterOption {
    displayValue: string;
    identifier: string;
    productCount: number;
    value: number | object | string;
}

export interface Pagination {
    from: number;
    size: number;
    sortType: 1 | 2 | 3 | 4;
    total: number;
}

export interface SelectedFilters {
    [key: string]: Array<FilterOption>;
}