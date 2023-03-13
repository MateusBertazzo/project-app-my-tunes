import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_NUMBER = 3;

class Login extends Component {
  state = {
    name: '',
    loading: false,
    logado: false,
  };

  handleSubmit = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      // loading: false,
      logado: true,
    });
  };

  render() {
    const { name, loading, logado } = this.state;
    const form = (
      <form>
        <input
          onChange={ ({ target }) => this.setState({ name: target.value }) }
          type="text"
          data-testid="login-name-input"
          placeholder="Login"
          minLength="3"
        />

        <button
          onClick={ this.handleSubmit }
          disabled={ name.length < MIN_NUMBER }
          type="button"
          data-testid="login-submit-button"
        >
          Entrar

        </button>
      </form>);

    return (
      <div data-testid="page-login">
        {!loading ? form : <Loading />}
        {logado && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
