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
  };

  componentDidMount() {
    this.getUsersPlaylists();
  }

  render() {
    const playlists = this.state.spotifyPlaylists.map((result) => {
      return (
        <div>
          <button
            onClick={() => {
              this.findArtistsInPlaylist(result.id);
            }}
          >
            <div>
              <img
                src={result["images"][0].url}
                alt={result["name"]}
                style={{ height: 150 }}
              />
              <h2>{result["name"]}</h2>
            </div>
          </button>
        </div>
      );
    });

    const recommendations = this.state.leastFollowed.map((result) => {
      return (
        <div>
          <div>
            <img
              src={result["images"].length < 1 ? "#" : result["images"][0].url}
              alt={result["name"]}
              style={{ height: 150 }}
            />
            <h2>{result["name"]}</h2>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1>Pick a playlist to make better</h1>
        <div className="row">
          <div>{playlists}</div>
          <div>{recommendations}</div>
          <button
            onClick={() => {
              this.makePlaylist();
            }}
          >
            make a playlist with these artists
          </button>
          <h2>{this.state.update}</h2>
        </div>
      </div>
    );
  }
  //FUNCTIONS THAT IMPLEMENT THE WEB APP//
  getUsersPlaylists() {
    spotifyApi.getUserPlaylists().then((response) => {
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
            this.setState({
              artistsTopTracks: this.state.artistsTopTracks.concat(
                response.tracks[0].uri
              ),
            });
          });
        }
      );
    }
  }

  makePlaylist() {
    spotifyApi.getMe().then((response) => {
      spotifyApi
        .createPlaylist(response.id, {
          name: "The New Playlist",
          public: false,
        })
        .then((response) => {
          this.setState({
            update:
              "Your playlist is know available at: " +
              response.external_urls.spotify,
          });
          spotifyApi.addTracksToPlaylist(
            response.id,
            this.state.artistsTopTracks
          );
        });
    });
  }
}

export default PlaylistResult;
