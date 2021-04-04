import React from 'react';
import './top-nav.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    title: state.navTitle,
  }
};

class TopNav extends React.Component {
  render() {
    return (
      <header className="app-header">
        {`Spotify ${this.props.title}`}
      </header>
    );
  }
}

export default connect(mapStateToProps)(TopNav);