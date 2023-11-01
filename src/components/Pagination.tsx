import React from 'react';
import './styles.css';

interface Props {
  pageCount: number;
  handleClick: (buttonNumber: number) => void;
}

const Pagination: React.FC<Props> = ({ pageCount, handleClick }) => {
  const handleButton = (temp: number) => {
    handleClick(temp);
  };
  const buttons = Array.from({ length: pageCount }, (_, index) => (
    <a
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
};

export default Pagination;
