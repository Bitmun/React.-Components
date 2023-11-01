import React, { useEffect, useState } from 'react';
import { IPokemon } from './SearchList';
import './styles.css';
interface Props {
  data: IPokemon;
  getUrl: (url: string) => void;
}

const Pokemon: React.FC<Props> = ({ data }) => {
  const [stats, setStats] = useState({
    weight: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSmallDescription();
  }, [data.url]);

  async function getSmallDescription() {
    const desc = await fetch(data.url).then((response) => response.json());
    setTimeout(() => {
      setStats({
        weight: desc.weight,
        height: desc.height,
      });
      setIsLoading(false);
    }, 500);
  }
  const getFullDiscription = async () => {
    const fullDesc = await fetch(data.url).then((response) => response.json());
    console.log(fullDesc);
    //const pictureUrl = fullDesc.sprites.front_default;
    const locationUrl = fullDesc.location_area_encounters;
    const loca = await fetch(locationUrl).then((response) => response.json());
    console.log(loca);
  };
  return (
    <div onClick={getFullDiscription} className="pokemonCard">
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
