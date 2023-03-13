import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

const MIN_NUMBER = 3;

class Login extends Component {
  state = {
    name: '',
  };

  saveInLocalStorage = () => {
    const { history } = this.props;
    const { name } = this.state;
    createUser({ name });
  };

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            onChange={ ({ target }) => this.setState({ name: target.value }) }
            type="text"
            data-testid="login-name-input"
            placeholder="Login"
            minLength="3"
          />

          <button
            onClick={ this.saveInLocalStorage }
            disabled={ name.length < MIN_NUMBER }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
