import propTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isFavoritArray: [],
  };

  saveMusic = (obj) => {
    const { isFavoritArray } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(obj);
      this.setState({
        loading: false,
        isFavoritArray: [...isFavoritArray, obj],
      });
    });
  };

  render() {
    const { loading, isFavoritArray } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    const cardMusic = (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onClick={ () => this.saveMusic(this.props) }
            checked={ isFavoritArray.some((check) => check.trackId === trackId) }
          />
        </label>
      </div>

    );
    return (
      <div>{loading ? <Loading /> : cardMusic}</div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;
