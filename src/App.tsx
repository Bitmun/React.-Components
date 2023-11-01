import { useEffect, useReducer, useState } from 'react';
import {
  Data,
  FetchData,
  PaginationAction,
  PaginationActionKind,
  PaginationState,
} from './interfaces/data';
import {
  localStorageCheck,
  sortByParams,
  sortDataByInput,
} from './utils/handleSort';
import Search from './components/Search';
import SearchList from './components/SearchList';
import Pagination from './components/Pagination';

const reducer = (state: PaginationState, action: PaginationAction) => {
  const { type, payload } = action;
  switch (type) {
    case PaginationActionKind.newSearch:
      return {
        ...state,
        offset: 0,
        currentPage: 0,
      };
    case PaginationActionKind.changePageCount:
      return {
        ...state,
        pageCount: payload,
      };
    default:
      return state;
    case PaginationActionKind.changeSelectedPage:
      return {
        ...state,
        currentPage: payload,
      };
    case PaginationActionKind.changeOffSet:
      return {
        ...state,
        offset: payload,
      };
  }
};

const initialPagination = {
  offset: 0,
  perPage: 5,
  currentPage: 0,
  pageCount: 0,
};

function App() {
  const [data, setData] = useState([] as Data[]);
  const [pagination, dispatch] = useReducer(reducer, initialPagination);

  const handleData = async (bySearch: boolean, inputValue?: string) => {
    if (bySearch) {
      dispatch({
        type: PaginationActionKind.newSearch,
        payload: 0,
      });
    }
    await fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => response.json())
      .then((data: FetchData) => {
        if (inputValue) {
          data.results = sortDataByInput(data.results, inputValue);
        } else {
          localStorageCheck(data);
        }
        const slice = sortByParams(
          data.results,
          pagination.offset,
          pagination.perPage
        );
        const pageCount = Math.ceil(data.results.length / pagination.perPage);
        setData(slice);
        dispatch({
          type: PaginationActionKind.changePageCount,
          payload: pageCount,
        });
      });
  };

  const handlePageClick = (pageNumber: number) => {
    const selectedPage = pageNumber;
    const offset = selectedPage * pagination.perPage;
    // this.setState(
    //   {
    //     currentPage: selectedPage,
    //     offset,
    //   },
    //   () => {
    //     handleData(false);
    //   }
    // );
    dispatch({
      type: PaginationActionKind.changeOffSet,
      payload: offset,
    });
    dispatch({
      type: PaginationActionKind.changeSelectedPage,
      payload: selectedPage,
    });
  };

  useEffect(() => {
    handleData(false);
  }, [handlePageClick]);

  return (
    <div>
      <Search handleData={handleData}></Search>
      <SearchList data={data}></SearchList>
      <Pagination
        pageCount={pagination.pageCount}
        handleClick={handlePageClick}
      />
    </div>
  );
}

export default App;
