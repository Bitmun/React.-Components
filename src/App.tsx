import { Component } from 'react';
import Search from './components/Search';
import SearchList from './components/SearchList';
import {
  sortDataByInput,
  sortByParams,
  localStorageCheck,
} from './utils/handleSort';
import { Data, FetchData } from './interfaces/data';
import Pagination from './components/Pagination';

class App extends Component {
  state = {
    data: [] as Data[],
    offset: 0,
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
  };

  componentDidMount(): void {
    this.handleData(false);
  }
  handleData = async (bySearch: boolean, inputValue?: string) => {
    if (bySearch) {
      this.setState({ currentPage: 0, offset: 0 });
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
          this.state.offset,
          this.state.perPage
        );
        const pageCount = Math.ceil(data.results.length / this.state.perPage);
        this.setState({
          data: slice,
          pageCount,
        });
      });
  };

  handlePageClick = (pageNumber: number) => {
    const selectedPage = pageNumber;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset,
      },
      () => {
        this.handleData(false);
      }
    );
  };

  render() {
    return (
      <div>
        <Search handleData={this.handleData}></Search>
        <SearchList data={this.state.data}></SearchList>
        <Pagination
          pageCount={this.state.pageCount}
          handleClick={this.handlePageClick}
        />
      </div>
    );
  }
}

export default App;
