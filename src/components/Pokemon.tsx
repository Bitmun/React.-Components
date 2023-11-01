import React, { useEffect, useState } from 'react';
import { IPokemon } from './SearchList';

interface Props {
  data: IPokemon;
}

// const SearchList: React.FC<Props> = ({ data }) => {

const Pokemon: React.FC<Props> = ({ data }) => {
  const [stats, setStats] = useState({
    weight: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getDescription();
  }, [data.url]);
  async function getDescription() {
    const desc = await fetch(data.url).then((response) => response.json());
    setTimeout(() => {
      setStats({
        weight: desc.weight,
        height: desc.height,
      });
      setIsLoading(false);
    }, 500);
  }
  return (
    <div className="pokemonCard">
      <h3>{data.name}</h3>
      <div>
        weight: {isLoading ? <span>...</span> : <span>{stats.weight}</span>}
      </div>
      <div>
        height: {isLoading ? <span>...</span> : <span>{stats.height}</span>}
      </div>
    </div>
  );
};

export default Pokemon;
