export interface FetchData {
  count: number;
  next: string;
  previous: string;
  results: Data[];
}

export interface Data {
  name: string;
  url: string;
}

export interface PaginationState {
  offset: number;
  perPage: number;
  currentPage: number;
  pageCount: number;
}

export enum PaginationActionKind {
  newSearch = 'newSearch',
  changePageCount = 'changePageCount',
  changeSelectedPage = 'changeSelectedPage',
  changeOffSet = 'changeOffSet',
}

export interface PaginationAction {
  type: PaginationActionKind;
  payload: number;
}
