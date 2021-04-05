import React from 'react';
import './artists-list.css';
import { isArray, isEqual } from 'lodash';
import StarRatings from 'react-star-ratings';
import { withRouter} from "react-router";
import Button from 'react-bootstrap/Button';
import queryString from "query-string";
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import {saveArtistsState} from "../../actions/artists";
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    state: state.artists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveArtistsState: data => dispatch(saveArtistsState(data)),
  }
}

class ArtistsList extends React.Component {
  constructor(props) {
    super(props);
    if (!props.state) {
      this.state = {
        prevArtistsList: props.artists.items,
        artistsList: props.artists.items,
        offset: props.artists.offset + props.artists.limit,
        limit: props.artists.limit,
        total: props.artists.total,
        loading: false,
      };
    } else {
      this.state = {
        ...props.state,
      };
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.token) {
      nextProps.history.push('/login');
      return null;
    }

    if (!isEqual(nextProps.artists.items, prevState.prevArtistsList)) {
      nextProps.saveArtistsState({
        ...nextProps.state,
        prevArtistsList: nextProps.artists.items,
        artistsList: nextProps.artists.items,
        offset: nextProps.artists.offset + nextProps.artists.limit,
        limit: nextProps.artists.limit,
        total: nextProps.artists.total,
      });

      return {
        prevArtistsList: nextProps.artists.items,
        artistsList: nextProps.artists.items,
        offset: nextProps.artists.offset + nextProps.artists.limit,
        limit: nextProps.artists.limit,
        total: nextProps.artists.total,
      };
    }

    return null;
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

  getArtistRatingPercentage(percentage) {
    return (percentage * 5) / 100;
  }

  async loadMoreArtists() {
    const params = queryString.stringify({
      q: this.props.query,
      type: 'artist',
      offset: this.state.offset,
      limit: this.state.limit,
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
      const json = await response.json();
      this.saveState({
        artistsList: [...this.state.artistsList.concat(json.artists.items)],
        limit: json.artists.limit,
        offset: this.state.offset + json.artists.offset,
        loading: false,
      });
    }  else if (response.status === 401) {
      this.props.history.push('/login');
    }
  }

  saveState(newState, callback = null) {
    this.props.saveArtistsState({
      ...this.state,
      ...newState,
    });

    this.setState(newState, callback);
  }

  render() {
    let content;
    let button;
    let noDataFound;

    if (isArray(this.state.artistsList) && this.state.artistsList.length > 0) {
      content = this.state.artistsList.map((artist, index) => {
        return (
          <div className="form-group col-lg-3" key={index}>
            <div className="artist-info">
              <a
                onClick={(event) => {
                  event.preventDefault();
                  this.props.redirectToArtistAlbums(artist);
                }}
                href={`/search/${artist.name.toLowerCase().replace(' ', '_')}/albums`}
              >
                <div className="image-section" style={this.getInlineStylingBackgroundImage(artist)}/>

                <div className="name-description-section">
                  <span className="artist-name" title={artist.name}>
                    { artist.name }
                  </span>
                  <span className="artist-followers">
                    { `${artist.followers.total.toLocaleString()} followers` }
                  </span>
                </div>
              </a>

              <div className="rate-section">
                <div className="stars">
                  <StarRatings
                    rating={this.getArtistRatingPercentage(artist.popularity)}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      });
    } else if (isArray(this.state.artistsList) && this.state.artistsList.length === 0) {
      noDataFound = (
        <div className="row">
          <div className="col-lg-2"/>

          <div className="col-lg-8">
            <Alert className="no-data-found" variant="secondary">
              No artists found.
            </Alert>
          </div>

          <div className="col-lg-2"/>
        </div>
      );
    }

    if (this.state.offset < this.state.total) {
      let buttonLabel;

      if (!this.state.loading) {
        buttonLabel = 'Load More Artists';
      } else {
        buttonLabel = <Spinner animation="border" />;
      }

      button = (
        <div className="row">
          <div className="col-lg-4"/>

          <div className="load-artists-btn-wrapper col-lg-4">
            <Button
              onClick={() => {
                this.saveState({
                  loading: true,
                }, this.loadMoreArtists);
              }}
              className="load-artists-btn"
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

    return (
      <div className="artists-list-component">
        <div className="row">
          { content }
        </div>

        { noDataFound }

        { button }
      </div>
    );
  }
}

ArtistsList.propTypes = {
  query: PropTypes.string,
  artists: PropTypes.object,
  redirectToArtistAlbums: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistsList));