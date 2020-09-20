import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Result extends Component {
  constructor() {
    super();
  }
  state = {
    spotifyRes: [],
    similarArtists: [],
  };

  componentDidMount() {
    this.getUsersTopArtists();
    this.getSimilarArtists();
  }

  getUsersTopArtists() {
    spotifyApi.getMyTopArtists().then((response) => {
      const results = response.items.map((result) => {
        return result;
      });
      this.setState({ spotifyRes: results });
    });
  }

  getSimilarArtists() {
    spotifyApi
      .getArtistRelatedArtists("6yJ6QQ3Y5l0s0tn7b0arrO")
      .then((response) => {
        const relatedArtists = response.artists.map((result) => {
          return result;
        });
        this.setState({ similarArtists: relatedArtists }, () => {
          this.getLeastFollowedArtist();
        });
        //console.log(this.state.similarArtists);
      });
  }

  getLeastFollowedArtist() {
    let artist = "";
    let followers = 999999999;
    for (let i = 0; i < this.state.similarArtists.length; i++) {
      if (followers > this.state.similarArtists[i].followers.total)
        artist = this.state.similarArtists[i].name;
    }
    console.log(artist);
    //return artist;
  }

  render() {
    const results = this.state.spotifyRes.map((result) => {
      return (
        <div className="row">
          <div>
            <img
              src={result["images"][0].url}
              alt={result["name"]}
              style={{ width: 150 }}
            />
            <h2 style={{ width: 150 }}>{result["name"]}</h2>
          </div>
          <div>
            <img
              src={result["images"][0].url}
              alt={result["name"]}
              style={{ width: 150 }}
            />
            <h2 style={{ width: 150 }}>{result["name"]}</h2>
          </div>
        </div>
      );
    });
    return results;
  }
}

export default Result;
