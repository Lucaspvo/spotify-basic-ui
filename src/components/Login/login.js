import React from 'react';
import LoginButton from './login-button.js';
import './login.css';
import queryString from 'query-string';

class Login extends React.Component {
  render() {
    return (
      <div className="login-component">
        <LoginButton
          onClick={this.redirectUserToLoginAtSpotify}
          label="Login with Spotify"
          type="dark"
        />
      </div>
    );
  }

  redirectUserToLoginAtSpotify() {
    const params = {
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      state: process.env.REACT_APP_STATE,
    };

    window.open(
      `${process.env.REACT_APP_SPOTIFY_REQUEST_AUTHORIZATION_URL}?${queryString.stringify(params)}`
    );
  }
}

export default Login;