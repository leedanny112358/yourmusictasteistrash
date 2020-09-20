import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class topResult extends Component {
  state = {
    spotifyRes: [],
    similarArtists: [],
    leastFollowed: [],
  };

  componentDidMount() {
    this.getUsersTopArtists();
  }

  render() {
    const mostListenedTo = this.state.spotifyRes.map((result) => {
      return (
        <div>
          <div>
            <img
              src={result["images"][0].url}
              alt={result["name"]}
              style={{ height: 150 }}
            />
            <h2>{result["name"]}</h2>
          </div>
        </div>
      );
    });

    const leastListenedTo = this.state.leastFollowed.map((result) => {
      return (
        <div>
          <div>
            <img
              src={result["images"][0].url}
              alt={result["name"]}
              style={{ height: 150 }}
            />
            <h2>{result["name"]}</h2>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        <div>
          <div>Top Artists</div>
          <div>{mostListenedTo}</div>
        </div>
        <div>
          <div>Recommendations</div>
          <div>{leastListenedTo}</div>
        </div>
      </div>
    );
  }
  //FUNCTIONS THAT IMPLEMENT THE WEB APP//
  getUsersTopArtists() {
    spotifyApi.getMyTopArtists().then((response) => {
      const results = response.items.map((result) => {
        return result;
      });
      this.setState({ spotifyRes: results }, () => {
        for (let i = 0; i < this.state.spotifyRes.length; i++) {
          this.getSimilarArtists(this.state.spotifyRes[i].id);
        }
        //Gets rid of access token in the url hash parameters//
        window.location.hash = "";
        window.history.pushState(
          null,
          "",
          window.location.href.replace("#", "")
        );
      });
    });
  }

  getSimilarArtists(artistId) {
    spotifyApi.getArtistRelatedArtists(artistId).then((response) => {
      const relatedArtists = response.artists.map((result) => {
        return result;
      });
      this.setState({ similarArtists: relatedArtists }, () => {
        this.getLeastFollowedArtist();
      });
    });
  }

  getLeastFollowedArtist() {
    let artist = "";
    let followers = 999999999;
    for (let i = 0; i < this.state.similarArtists.length; i++) {
      if (followers > this.state.similarArtists[i].followers.total)
        artist = this.state.similarArtists[i];
      followers = this.state.similarArtists[i].followers.total;
    }
    this.setState({ leastFollowed: this.state.leastFollowed.concat(artist) });
  }
}

export default topResult;
