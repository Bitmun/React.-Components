import { Component } from 'react';
import './styles.css';
import Pokemon from './Pokemon';
import { Data } from '../interfaces/data';

interface Props {
  data: Data[];
}

export interface IPokemon {
  name: string;
  url: string;
}

export default class SearchList extends Component<Props> {
  render() {
    return (
      <div className="listWrapper">
        {(this.props.data.length != 0 && (
          <div className="dataWrapper">
            {this.props.data.map((e: IPokemon, key) => {
              return <Pokemon key={key} data={e}></Pokemon>;
            })}
          </div>
        )) || <div>Nothing here...</div>}
      </div>
    );
  }
}
