import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search" />
      </div>

    );
  }
}

export default Search;
