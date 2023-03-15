import propTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
    favoritArrayMusic: [],
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const arrayMusic = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoritArrayMusic: arrayMusic,
      }, () => this.checkMusic());
    });
  }

  checkMusic = () => {
    const { favoritArrayMusic } = this.state;
    const { trackId } = this.props;
    favoritArrayMusic.forEach((index) => {
      if (index.trackId === trackId) {
        this.setState({
          checked: true,
        });
      }
    });
  };

  saveMusic = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { star } = this.props;
      const { checked } = this.state;
      await addSong(star);
      this.setState({
        loading: false,
        checked: !checked,
      });
    });
  };

  render() {
    const { loading, checked } = this.state;
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
            checked={ checked }
            onChange={ this.saveMusic }
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
