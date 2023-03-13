import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.returnData();
  }

  returnData = () => {
    this.setState({ loading: true }, async () => {
      const nome = await getUser();
      // console.log(nome);
      this.setState({
        loading: false,
        name: nome.name,
      });
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h1 data-testid="header-user-name">{name}</h1>}
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
