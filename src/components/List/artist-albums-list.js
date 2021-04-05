import React from 'react';
import { connect } from 'react-redux';
import queryString from "query-string";
import Button from "react-bootstrap/Button";
import {isArray} from "lodash";
import { withRouter} from "react-router";
import './artist-albums-list.css';
import {changeNavTitle} from "../../actions/navTitle";
import Spinner from "react-bootstrap/Spinner";
import { saveArtistAlbumsState } from "../../actions/artistAlbums.js";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    state: state.artistAlbums,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavTitle: title => dispatch(changeNavTitle(title)),
    saveArtistAlbumsState: data => dispatch(saveArtistAlbumsState(data)),
  };
}

class ArtistAlbumsList extends React.Component {
  constructor(props) {
    super(props);

    if (!props.state) {
      this.state = {
        albumsList: null,
        offset: null,
        limit: null,
        total: null,
        loading: false,
      };
    } else {
      this.state = {
        ...props.state,
      };
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.artist) {
      nextProps.changeNavTitle(`${nextProps.artist.name}'s Albums`);
    }

    return null;
  }

  async componentDidMount() {
    if (!this.props.token) {
      this.props.history.push('/login');
      return;
    }

    const response = await fetch(
`${process.env.REACT_APP_SPOTIFY_URL}/v1/artists/${this.props.artist.id}/albums`,
  {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      }
    );

    if (response.ok) {
      const json = await response.json();

      this.saveState({
        albumsList: json.items,
        offset: json.offset + json.limit,
        limit: json.limit,
        total: json.total,
      });
    } else if (response.status === 401) {
      this.props.history.push('/login');
    }
  }

  async loadMoreArtists() {
    const params = queryString.stringify({
      offset: this.state.offset,
      limit: this.state.limit,
    });

    const response = await fetch(
  `${process.env.REACT_APP_SPOTIFY_URL}/v1/artists/${this.props.artist.id}/albums?${params}`,
    {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      }
    );

    if (response.ok) {
      const json = await response.json();
      this.saveState({
        albumsList: [...this.state.albumsList.concat(json.items)],
        limit: json.limit,
        offset: this.state.offset + json.offset,
        loading: false,
      });
    } else if (response.status === 401) {
      this.props.history.push('/login');
    }
  }

  getInlineStylingBackgroundImage(artist) {
    if (artist.images.length > 0) {
      return {
        backgroundImage: `url(${artist.images[0].url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    }

    return {
      backgroundColor: 'gray',
    };
  }

  getArtistsIncludedOnAlbum(album) {
    return album.artists.map(artist => artist.name).join(', ');
  }

  saveState(newState, callback = null) {
    this.props.saveArtistAlbumsState({
      ...this.state,
      ...newState,
    });

    this.setState(newState, callback);
  }

  getTracksLabel(total_tracks) {
    return total_tracks > 1 ? 'tracks' : 'track';
  }

  render() {
    let content;
    let button;
    let noDataFound;

    if (isArray(this.state.albumsList) && this.state.albumsList.length > 0) {
      content = this.state.albumsList.map((album, index) => {
        return (
          <div className="form-group col-lg-3" key={index}>
            <div className="album-info">
              <div className="image-section" style={this.getInlineStylingBackgroundImage(album)}/>

              <div className="album-description-section">
                <span className="album-name" title={album.name}>
                  { album.name }
                </span>

                <span className="artists-names" title={this.getArtistsIncludedOnAlbum(album)}>
                  { this.getArtistsIncludedOnAlbum(album) }
                </span>

                <div className="release-date">
                  { album.release_date }
                </div>

                <div className="number-of-tracks">
                  { `${album.total_tracks} ${this.getTracksLabel(album.total_tracks)}` }
                </div>
              </div>

              <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
                <div className="preview-album">
                  <span>
                    Preview on Spotify
                  </span>
                </div>
              </a>
            </div>
          </div>
        )
      });
    } else if (isArray(this.state.albumsList) && this.state.albumsList.length === 0) {
      noDataFound = (
        <div className="row">
          <div className="col-lg-2"/>

          <div className="col-lg-8">
            <Alert className="no-data-found" variant="secondary">
              No albums found.
            </Alert>
          </div>

          <div className="col-lg-2"/>
        </div>
      );
    }

    if (this.state.offset < this.state.total) {
      let buttonLabel;

      if (!this.state.loading) {
        buttonLabel = 'Load More Albums';
      } else {
        buttonLabel = <Spinner animation="border" />;
      }

      button = (
        <div className="row">
          <div className="col-lg-4"/>

          <div className="load-artist-albums-btn-wrapper col-lg-4">
            <Button
              onClick={() => {
                this.saveState({
                  loading: true,
                }, this.loadMoreArtists);
              }}
              className="load-artist-albums-btn"
              variant="dark"
              disabled={this.state.loading}
            >
              { buttonLabel }
            </Button>
          </div>

          <div className="col-lg-4"/>
        </div>
      );
    }

    if (this.props.artist && isArray(this.state.albumsList)) {
      return (
        <div className="artist-albums-list-component">
          <div className="album-section-title row">
            <div className="col-lg-12">
              <span className="artist-title">{this.props.artist.name}</span>
            </div>
            <div className="col-lg-12">
              <span className="album-label">Albums</span>
            </div>
          </div>

          <div className="row">
            { content }
          </div>

          { noDataFound }

          { button }
        </div>
      );
    }

    return '';
  }
}

ArtistAlbumsList.propTypes = {
  artist: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistAlbumsList));