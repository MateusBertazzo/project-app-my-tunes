import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    inputSearch: '',
    loading: false,
    data: [],
    artist: '',
  };

  handleClick = () => {
    const { inputSearch } = this.state;

    this.setState({
      loading: true,
      artist: inputSearch,
    }, async () => {
      const getAlbunsApi = await searchAlbumsAPI(inputSearch);
      this.setState({
        data: [...getAlbunsApi],
        loading: false,
        inputSearch: '',
      });
    });
  };

  render() {
    const { inputSearch, loading, data, artist } = this.state;
    const MIN_NUMBER_LENGTH = 2;
    const form = (
      <form>
        <input
          onChange={ ({ target }) => this.setState({ inputSearch: target.value }) }
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          value={ inputSearch }
        />
        <button
          disabled={ inputSearch.length < MIN_NUMBER_LENGTH }
          type="button"
          data-testid="search-artist-button"
          onClick={ this.handleClick }
        >
          Pesquisar

        </button>
      </form>);

    const sectionAlbum = (
      <section>
        <div>
          <p>{`Resultado de álbuns de: ${artist}`}</p>
        </div>

        <div>
          {data.map((star) => (
            <section className="star-container" key={ star.collectionId }>
              <img src={ star.artworkUrl100 } alt={ star.artistName } />
              <p>{star.artistName}</p>
              <p>{star.collectionName}</p>
              <Link
                to={ `/album/${star.collectionId}` }
                data-testid={ `link-to-album-${star.collectionId}` }
              >
                Album de Música
              </Link>
            </section>
          ))}

        </div>
      </section>
    );

    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {loading === true ? (<Loading />) : form }
        </div>
        {data.length === 0 ? <p>Nenhum álbum foi encontrado</p> : sectionAlbum}
      </div>
    );
  }
}

export default Search;
