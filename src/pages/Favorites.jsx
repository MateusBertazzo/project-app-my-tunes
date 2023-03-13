import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites" />
      </div>

    );
  }
}

export default Favorites;
