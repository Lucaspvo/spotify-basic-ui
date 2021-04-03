import React from 'react';
import './top-nav.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    navTitle: state.navTitle,
  }
};

class TopNav extends React.Component {
  render() {
    return (
      <header className="app-header">
        {`Spotify ${this.props.navTitle}`}
      </header>
    );
  }
}

export default connect(mapStateToProps)(TopNav);