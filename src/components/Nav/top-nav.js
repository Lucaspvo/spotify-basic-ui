import React from 'react';
import './top-nav.css';
import { connect } from 'react-redux';
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { logOut } from '../../actions/auth.js';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => {
  return {
    title: state.navTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

class TopNav extends React.Component {
  userLogOut() {
    this.props.logOut();
    this.props.history.push('/login');
  }

  render() {
    return (
      <header className="app-header">
        <div>
          {`Spotify ${this.props.title}`}
        </div>

        <div className="logout-icon">
          <FontAwesomeIcon onClick={this.userLogOut.bind(this)} icon={faSignOutAlt} title="Logout" />
        </div>
      </header>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));