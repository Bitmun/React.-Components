import { Data, FetchData } from '../interfaces/data';

export const sortDataByInput = (arr: Data[], inputValue: string) => {
  return arr.filter((obj: Data) => obj.name.startsWith(inputValue));
};

export const sortByParams = (arr: Data[], offset: number, perPage: number) => {
  return arr.slice(offset, offset + perPage);
};

export const localStorageCheck = (data: FetchData) => {
  if (localStorage.getItem('lastInput') !== null) {
    const lastInput = localStorage.getItem('lastInput');
    if (typeof lastInput === 'string') {
      data.results = sortDataByInput(data.results, lastInput);
    }
  }
};
