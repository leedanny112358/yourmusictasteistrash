import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
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
    this.state = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  componentDidMount() {
    //Gets rid of access token in the url hash parameters//
    window.location.hash = "";
    window.history.pushState(null, "", window.location.href.replace("#", ""));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <div className="App">
            <a href="http://localhost:8888/login"> Login to Spotify </a>
            <h1>{this.state.accessToken}</h1>
            <h1>{this.state.refreshToken}</h1>
          </div>
        </header>
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
