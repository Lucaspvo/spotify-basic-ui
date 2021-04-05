import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch, withRouter} from "react-router";
import './search.css';
import { debounce } from 'lodash';
import queryString from 'query-string';
import SearchTextInput from './search-text-input.js';
import ArtistsList from '../List/artists-list.js';
import ArtistAlbumsList from '../List/artist-albums-list.js';
import { changeNavTitle } from '../../actions/navTitle.js';
import { saveSearchState } from '../../actions/search.js';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    state: state.search,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavTitle: title => dispatch(changeNavTitle(title)),
    saveSearchState: title => dispatch(saveSearchState(title)),
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
    if (artists.artists.items) {
      this.saveState({
        artists: artists.artists,
        loading: false,
      });
    }
  } else if (response.status === 401) {
    this.props.history.push('/login');
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    if (!props.state) {
      this.state = {
        searchInput: '',
        artists: null,
        artist: null,
        loading: false,
      };
    } else {
      this.state = {
        ...props.state,
      };
    }

    this.fetchArtists = debounce(fetchArtistsFromSpotify.bind(this), 1000);
    props.changeNavTitle('Search Artist');
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.token) {
      nextProps.history.push('/login');
    }

    return null;
  }

  getSearchInputWrapperClasses() {
    const classes = ['col-lg-6'];
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
      this.saveState(
        {
          searchInput: event.target.value,
          loading: true,
        },
      () => this.fetchArtists(event.target.value)
      );
    } else {
      this.saveState({
        searchInput: '',
      });
    }
  }

  redirectToArtistAlbums(artist) {
    this.saveState(
    {
        artist,
      },
    () => this.props.history.push(
        `/search/${artist.name.toLowerCase().replace(' ', '_')}/albums`
      )
    );
  }

  saveState(newState, callback = null) {
    this.props.saveSearchState({
      ...this.state,
      ...newState,
    });

    this.setState(newState, callback);
  }

  render() {
    let artistsList;
    if (this.state.searchInput && this.state.artists) {
      artistsList = (
        <ArtistsList
          query={this.state.searchInput}
          artists={this.state.artists}
          redirectToArtistAlbums={this.redirectToArtistAlbums.bind(this)}
        />
      );
    }

    return (
      <div className={this.getSearchComponentWrapperClasses()} data-testid="search-artists">
        <Switch>
          <Route path={'/search/artists'}>
            <div className={this.getSearchInputRowClasses()}>
              <div className="col-lg-3"/>

              <div className={this.getSearchInputWrapperClasses()}>
                <SearchTextInput
                  searchInput={this.state.searchInput}
                  onChange={this.onChange.bind(this)}
                  loading={this.state.loading}
                />
              </div>

              <div className="col-lg-3"/>
            </div>

            { artistsList }
          </Route>
          <Route path={'/search/:artist/albums'}>
            <ArtistAlbumsList artist={this.state.artist}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));