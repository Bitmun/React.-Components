import { ChangeEvent, Component } from 'react';

interface SearchProps {
  handleData: (bySearch: boolean, inputValue: string) => void;
}

class Search extends Component<SearchProps> {
  state = {
    inputValue: localStorage?.getItem('lastInput') || '',
  };
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };
  handleClick = async () => {
    const input = this.state.inputValue.trim();
    localStorage.setItem('lastInput', input);
    this.props.handleData(true, input);
    this.setState({
      inputValue: input,
    });
  };
  render() {
    return (
      <header className="header">
        <div className="searchWrapper">
          <input
            className="searchInput"
            onChange={this.handleChange}
            placeholder="Search..."
            value={this.state.inputValue}
          />
          <button className="searchButton" onClick={this.handleClick}>
            Search
          </button>
        </div>
      </header>
    );
  }
}

export default Search;
