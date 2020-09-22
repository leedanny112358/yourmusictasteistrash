import React, { Component } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
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
        <div>
          <LandingPage />
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
