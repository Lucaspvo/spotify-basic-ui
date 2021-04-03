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
  componentWillMount() {
    const response = queryString.parse(window.location.hash);
    if (response.state === process.env.REACT_APP_STATE) {
      this.props.userAuthorized({
        token: response.access_token,
        token_type: response.token_type,
      });
    }
  }

  render() {
    return <Redirect to={'/search'}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);