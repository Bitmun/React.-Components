import { Component } from 'react';
import './styles.css';
interface Props {
  pageCount: number;
  handleClick: (buttonNumber: number) => void;
}

export default class Pagination extends Component<Props> {
  doError = () => {
    throw new Error();
  };
  render() {
    const handleButton = (temp: number) => {
      this.props.handleClick(temp);
    };

    const buttons = Array.from({ length: this.props.pageCount }, (_, index) => (
      <a
        href="#"
        className="paginationNumber"
        onClick={() => handleButton(index)}
        key={index}
      >
        {index + 1}
      </a>
    ));

    return (
      <footer>
        <div className="pagination">{buttons}</div>
      </footer>
    );
  }
}
