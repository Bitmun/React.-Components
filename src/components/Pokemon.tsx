import { Component } from 'react';
import { IPokemon } from './SearchList';

interface Props {
  data: IPokemon;
}

export default class Pokemon extends Component<Props> {
  state = {
    weight: 0,
    height: 0,
  };
  componentDidMount() {
    this.getDescription();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data.url !== prevProps.data.url) {
      this.getDescription();
    }
  }

  getDescription = async () => {
    const desc = await fetch(this.props.data.url).then((response) =>
      response.json()
    );
    this.setState({
      weight: desc.weight,
      height: desc.height,
    });
  };
  render() {
    return (
      <div className="pokemonCard">
        <h3>{this.props.data.name}</h3>
        <div>weight: {this.state.weight}</div>
        <div>height: {this.state.height}</div>
      </div>
    );
  }
}
