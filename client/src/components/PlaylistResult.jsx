import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class PlaylistResult extends Component {
  state = {
    spotifyPlaylists: [],
    similarArtists: [],
    leastFollowed: [],
    artistsTopTracks: [],
    update: "",
    status: false,
  };

  componentDidMount() {
    this.getUsersPlaylists();
  }

  render() {
    if (this.state.status == true) {
      window.location.href = this.state.update;
    }
    const playlists = this.state.spotifyPlaylists.map((result) => {
      return (
        <div className="playlistbtn">
          <button
            className="playlist"
            onClick={() => {
              this.findArtistsInPlaylist(result.id);
              this.hide();
            }}
          >
            <div>
              <img
                src={
                  result["images"].length < 1 ? "#" : result["images"][0].url
                }
                alt={result["name"]}
                style={{ height: 150 }}
              />
              <h2 className="playlistname">{result["name"]}</h2>
            </div>
          </button>
        </div>
      );
    });

    return (
      <div>
        <h1>Pick a playlist to make better</h1>
        <div className="loader" id="show"></div>
        <div className="row" id="hide">
          <div className="content">{playlists}</div>
        </div>
        <p>version 0.8.1</p>
      </div>
    );
  }
  //FUNCTIONS THAT IMPLEMENT THE WEB APP//
  getUsersPlaylists() {
    spotifyApi
      .getUserPlaylists({
        limit: 50,
      })
      .then((response) => {
        const results = response.items.map((result) => {
          return result;
        });
        this.setState({ spotifyPlaylists: results }, () => {
          /* for (let i = 0; i < this.state.spotifyRes.length; i++) {
          this.getSimilarArtists(this.state.spotifyRes[i].id);
        } */
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

  findArtistsInPlaylist(playlistId) {
    spotifyApi.getPlaylistTracks(playlistId).then((response) => {
      const artists = response.items.map((result) => {
        return result.track.artists;
      });
      for (let i = 0; i < artists.length; i++) {
        if (artists[i].length > 1) {
          for (let feat = 0; feat < artists[i].length; feat++) {
            this.getSimilarArtists(artists[i][feat].id);
          }
        } else {
          this.getSimilarArtists(artists[i][0].id);
        }
      }
      this.makePlaylist(() => {
        this.setState({ leastFollowed: [], artistsTopTracks: [] });
      });
    });
  }

  getSimilarArtists(artistId) {
    spotifyApi.getArtistRelatedArtists(artistId).then((response) => {
      const relatedArtists = response.artists.map((result) => {
        return result;
      });
      if (relatedArtists.length > 0) {
        this.setState({ similarArtists: relatedArtists }, () => {
          this.getLeastFollowedArtist();
        });
      }
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

    let isDuplicate = this.state.leastFollowed.some(
      (el) => el.name === artist.name
    );

    if (!isDuplicate) {
      this.setState(
        { leastFollowed: this.state.leastFollowed.concat(artist) },
        () => {
          spotifyApi.getArtistTopTracks(artist.id, "US").then((response) => {
            console.log(response);
            if (
              response.tracks.length > 0 &&
              this.state.artistsTopTracks.length < 100
            ) {
              this.setState({
                artistsTopTracks: this.state.artistsTopTracks.concat(
                  response.tracks[0].uri
                ),
              });
            }
          });
        }
      );
    }
  }

  makePlaylist(callback) {
    spotifyApi.getMe().then((response) => {
      spotifyApi
        .createPlaylist(response.id, {
          name: "let me play you something you've never heard before",
          description:
            "Hey look, a new playlist! How did we make it? Well, we made a list of similar artists based on your trash playlist and then found the least known artists of that list. Then, we took the most popular song for each artist and slapped it in here to give you a playlist that contains some lesser known artists that you may like.",
          public: false,
        })
        .then((response) => {
          this.setState({
            update: response.external_urls.spotify,
          });
          spotifyApi
            .addTracksToPlaylist(response.id, this.state.artistsTopTracks)
            .then((response) => {
              this.setState({
                status: true,
              });
            });
        });
    });
    callback();
  }

  hide() {
    let hidden = document.getElementById("hide");
    let shown = document.getElementById("show");
    hidden.style.display = "none";
    shown.style.display = "block";
  }
}

export default PlaylistResult;
