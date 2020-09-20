import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import TopResult from "./components/TopResult.jsx";
import PlaylistResult from "./components/PlaylistResult.jsx";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    let params = this.getHashParams();
    let accessToken = params.access_token;
    let refreshToken = params.refresh_token;
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <button
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://ymtit.herokuapp.com/login";
            }}
            style={{
              padding: "20px",
              "font-size": "20px",
              "margin-top": "20px",
            }}
          >
            Sign in with Spotify
          </button>
          <PlaylistResult />
        </div>
      </div>
    );
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
}

export default App;
