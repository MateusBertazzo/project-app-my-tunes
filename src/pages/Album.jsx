import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.cardMusic();
  }

  cardMusic = () => {
    const { match } = this.props;
    const { id } = match.params;
    // console.log(id);

    this.setState({}, async () => {
      const fetchMusic = await getMusics(id);
      // console.log(fetchMusic);
      this.setState({
        musics: fetchMusic,
        artistName: fetchMusic[0].artistName,
        collectionName: fetchMusic[0].collectionName,
      });
    });
  };

  render() {
    const { musics, artistName, collectionName } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
          {musics.map((music) => (
            <div key={ `${music.trackId} ${music.trackName}` }>
              {music.previewUrl !== undefined && <MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = ({
  id: propTypes.string,
}).isRequired;
