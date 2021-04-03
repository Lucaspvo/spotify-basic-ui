import React from 'react';
import './artists-list.css';
import { isArray } from 'lodash';

class ArtistsList extends React.Component {
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

  render() {
    let content;
    if (isArray(this.props.artists) && this.props.artists.length > 0) {
      content = this.props.artists.map((artist, index) => {
        console.log(artist);
        return (
          <div className="form-group col-md-3" key={index}>
            <div className="artist-info">
              <a href="">
                <div className="image-section" style={this.getInlineStylingBackgroundImage(artist)}/>

                <div className="name-description-section">
                  <label className="artist-name">
                    { artist.name }
                  </label>
                  <br/>
                  <label className="artist-followers">
                    { `${artist.followers.total} followers` }
                  </label>
                </div>
              </a>

              <div className="rate-section">

              </div>
            </div>
          </div>
        )
      });
    } else if (isArray(this.props.artists) && this.props.artists.length === 0) {
      content = (
        <div>
          NO ARTISTS FOUND
        </div>
      );
    } else {
      content = (
        <div>
          LOADING...
        </div>
      );
    }

    return (
      <div className="artists-list-component">
        <div className="row">
          { content }
        </div>
      </div>
    );
  }
}

export default ArtistsList;