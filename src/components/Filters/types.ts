export interface FilterData {
    displayName: string;
    identifier: string;
    options: Array<FilterOption>;
}
  
export interface FilterOption {
    displayValue: string;
    identifier: string;
    value: number | object | string;
}
  
export  interface SelectedFilters {
    [key: string]: Array<Partial<FilterOption>>;
}