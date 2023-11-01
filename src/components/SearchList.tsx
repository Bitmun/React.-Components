import React, { useCallback, useEffect, useState } from 'react';
import { Data } from '../interfaces/data';
import Pokemon from './Pokemon';
import PokemonInfo from './PokemonInfo';

type Props = {
  data: Data[];
};

export interface IPokemon {
  name: string;
  url: string;
}

const SearchList: React.FC<Props> = ({ data }) => {
  const [descriptionLink, setDescriptionLink] = useState('');

  useEffect(() => {
    data.length > 0 ? setDescriptionLink(data[0].url) : setDescriptionLink('');
    console.log(descriptionLink);
  }, [data]);

  const getFullInfo = useCallback((url: string) => {
    setDescriptionLink(url);
  }, []);
  return (
    <div className="listWrapper">
      {(data.length != 0 && (
        <div className="dataWrapper">
          {data.map((e: IPokemon, key) => {
            return <Pokemon key={key} data={e} getUrl={getFullInfo}></Pokemon>;
          })}
        </div>
      )) || <div>Nothing here...</div>}
      <PokemonInfo></PokemonInfo>
    </div>
  );
};

export default SearchList;
