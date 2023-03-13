import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    inputName: '',
  };

  render() {
    const { inputName } = this.state;
    const MIN_NUMBER_LENGTH = 2;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              onChange={ ({ target }) => this.setState({ inputName: target.value }) }
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
            <button
              disabled={ inputName.length < MIN_NUMBER_LENGTH }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </form>
        </div>
      </div>

    );
  }
}

export default Search;
