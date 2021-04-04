import React from 'react';
import { connect } from 'react-redux';
import queryString from "query-string";
import Button from "react-bootstrap/Button";
import {isArray} from "lodash";
import { withRouter} from "react-router";
import './artist-albums-list.css';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  }
}

class ArtistAlbumsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumsList: null,
      offset: null,
      limit: null,
      total: null,
    };
  }

  async componentWillMount() {
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

      console.log(json);

      this.setState({
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
      this.setState({
        artistsList: [...this.state.artistsList.concat(json.artists.items)],
        limit: json.artists.limit,
        offset: this.state.offset + json.artists.offset,
      });

      console.log(json);
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

  render() {
    console.log(this.props);
    let content;
    let button;

    if (isArray(this.state.albumsList) && this.state.albumsList.length > 0) {
      content = this.state.albumsList.map((album, index) => {
        return (
          <div className="form-group col-md-3" key={index}>
            <div className="album-info">
              <div className="image-section" style={this.getInlineStylingBackgroundImage(album)}/>

              <div className="album-description-section">
                <label className="album-name" title={album.name}>
                  { album.name }
                </label>

                <label className="artists-names">
                  { this.getArtistsIncludedOnAlbum(album) }
                </label>

                <div className="release-date">
                  { album.release_date }
                </div>

                <div className="number-of-tracks">
                  { `${album.total_tracks} tracks` }
                </div>
              </div>

              <div className="rate-section">
              </div>
            </div>
          </div>
        )
      });
    } else if (isArray(this.state.albumsList) && this.state.albumsList.length === 0) {
      content = (
        <div>
          NO ALBUMS FOUND
        </div>
      );
    }

    if (this.state.offset < this.state.total) {
      button = (
        <div className="row">
          <div className="load-artists-btn-wrapper col-md-12">
            <Button
              onClick={() => this.loadMoreArtists()}
              className="load-artists-btn"
              variant="dark"
            >
              Load More Artists
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="artist-albums-list-component">
        <div className="album-section-title row">
          <div className="col-md-12">
            <span className="artist-title">{this.props.artist.name}</span>
          </div>
          <div className="col-md-12">
            <span className="album-label">Albums</span>
          </div>
        </div>

        <div className="row">
          { content }
        </div>

        { button }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(ArtistAlbumsList));