import React from 'react';
import './content.css';
import Login from '../Login/login.js';
import Search from '../Search/search.js';
import Auth from '../auth.js';
import {Route, Switch, Redirect } from "react-router";
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

class Content extends React.Component {
  render() {
    const defaultRedirect = this.props.token ?
      <Redirect from='/' to='/search/artists' /> :
      <Redirect from='/' to='/login' />;

    return (
      <div className="spotify-content-component" data-testid="content">
        <Switch>
          <Route path={'/login'}>
            <Login/>
          </Route>
          <Route path={'/search'}>
            <Search/>
          </Route>
          <Route path={'/auth'}>
            <Auth/>
          </Route>
          <Route path={'/'}>
            { defaultRedirect }
          </Route>
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Content);