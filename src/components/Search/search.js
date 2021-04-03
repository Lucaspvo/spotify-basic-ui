import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import './search.css';
import { debounce } from 'lodash';
import queryString from 'query-string';
import SearchTextInput from './search-text-input.js';
import ArtistsList from '../List/artists-list.js';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  }
}

async function fetchArtistsFromSpotify(artist) {
  const params = queryString.stringify({
    q: artist,
    type: 'artist',
  });

  const response = await fetch(
  `${process.env.REACT_APP_SPOTIFY_URL}/v1/search?${params}`,
  {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    }
  );

  if (response.ok) {
    const artists = await response.json();
    console.log(artists.artists);
    if (artists.artists.items) {
      this.setState({
        artists: artists.artists.items,
      });
    }
  } else if (response.status === 401) {
    this.props.history.push('/login');
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      artists: null,
    };

    this.fetchArtists = debounce(fetchArtistsFromSpotify, 1000);
  }

  componentWillMount() {
    if (!this.props.token) {
      this.props.history.push('/login');
    }
  }

  getSearchInputWrapperClasses() {
    const classes = ['col-md-6'];
    if (!this.state.searchInput) {
      classes.push('my-auto');
    }

    return classes.join(' ');
  }

  getSearchComponentWrapperClasses() {
    const classes = ['search-component', 'container'];
    if (this.state.searchInput) {
      classes.push('padding');
    }

    return classes.join(' ');
  }

  getSearchInputRowClasses() {
    const classes = ['row'];
    if (!this.state.searchInput) {
      classes.push('min-height');
    }

    return classes.join(' ');
  }

  onChange(event) {
    if (event.target.value) {
      this.setState({
        searchInput: event.target.value,
      });

      this.fetchArtists(event.target.value);
    } else {
      this.setState({
        searchInput: null,
      });
    }
  }

  render() {
    let artistsList;
    if (this.state.searchInput) {
      artistsList = <ArtistsList artists={this.state.artists}/>;
    }

    return (
      <div className={this.getSearchComponentWrapperClasses()}>
        <div className={this.getSearchInputRowClasses()}>
          <div className="col-md-3"/>
          <div className={this.getSearchInputWrapperClasses()}>
            <SearchTextInput
              searchInput={this.state.searchInput}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="col-md-3"/>
        </div>
        { artistsList }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Search));