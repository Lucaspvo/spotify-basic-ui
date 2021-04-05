import React from 'react';
import LoginButton from './login-button.js';
import './login.css';
import queryString from 'query-string';
import { connect } from "react-redux";
import {changeNavTitle} from "../../actions/navTitle";

function mapDispatchToProps(dispatch) {
  return {
    changeNavTitle: title => dispatch(changeNavTitle(title)),
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    nextProps.changeNavTitle('Login');
    return null;
  }

  render() {
    return (
      <div className="login-component" data-testid="login">
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

    window.location.replace(
      `${process.env.REACT_APP_SPOTIFY_REQUEST_AUTHORIZATION_URL}?${queryString.stringify(params)}`
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);