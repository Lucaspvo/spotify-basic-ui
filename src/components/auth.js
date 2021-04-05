import React from 'react';
import { validAuthorization } from '../actions/auth.js';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from "react-router";

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAuthorized: data => dispatch(validAuthorization(data)),
  };
}

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    const response = queryString.parse(window.location.hash);
    if (response.state === process.env.REACT_APP_STATE) {
      nextProps.userAuthorized({
        token: response.access_token,
        token_type: response.token_type,
      });
    }

    return null;
  }

  render() {
    return <Redirect to={'/search/artists'}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);