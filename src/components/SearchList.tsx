import React from 'react';
import { Data } from '../interfaces/data';
import Pokemon from './Pokemon';

type Props = {
  data: Data[];
};

// type SearchProps = {
//   handleData: (bySearch: boolean, inputValue: string) => void;
// };

// const Search: React.FC<SearchProps> = ({ handleData }) => {

export interface IPokemon {
  name: string;
  url: string;
}

const SearchList: React.FC<Props> = ({ data }) => {
  return (
    <div className="listWrapper">
      {(data.length != 0 && (
        <div className="dataWrapper">
          {data.map((e: IPokemon, key) => {
            return <Pokemon key={key} data={e}></Pokemon>;
          })}
        </div>
      )) || <div>Nothing here...</div>}
    </div>
  );
};

export default SearchList;
