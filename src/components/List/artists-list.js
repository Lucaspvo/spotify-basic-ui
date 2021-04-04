import React from 'react';
import './artists-list.css';
import { isArray } from 'lodash';
import StarRatings from 'react-star-ratings';
import { withRouter} from "react-router";
import Button from 'react-bootstrap/Button';
import queryString from "query-string";
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

class ArtistsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistsList: props.artists.items,
      offset: props.artists.offset + props.artists.limit,
      limit: props.artists.limit,
      total: props.artists.total,
    };
  }

  componentWillMount() {
    if (!this.props.token) {
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
      this.setState({
        artistsList: [...this.state.artistsList.concat(json.artists.items)],
        limit: json.artists.limit,
        offset: this.state.offset + json.artists.offset,
      });

      console.log(json);
    }  else if (response.status === 401) {
      this.props.history.push('/login');
    }
  }

  render() {
    let content;
    let button;

    if (isArray(this.state.artistsList) && this.state.artistsList.length > 0) {
      content = this.state.artistsList.map((artist, index) => {
        return (
          <div className="form-group col-md-3" key={index}>
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
                  <label className="artist-name">
                    { artist.name }
                  </label>
                  <br/>
                  <label className="artist-followers">
                    { `${artist.followers.total.toLocaleString()} followers` }
                  </label>
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
      content = (
        <div>
          NO ARTISTS FOUND
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
      <div className="artists-list-component">
        <div className="row">
          { content }
        </div>

        { button }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(ArtistsList));