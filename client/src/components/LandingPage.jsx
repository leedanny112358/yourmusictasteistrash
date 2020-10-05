import React, { Component } from "react";
import Spotify from "./assets/spotify.png";
import Cdg from "./assets/cdg.png";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>your music taste is trash</h1>
        </div>
        <div className="cdg"></div>
        <div>
          <div className="content">
            <h2>
              “yO lEt mE pUt oN sOmE mUsIc U aIn’T nEvEr hEaRd bEfOrE.” - you
            </h2>
            <p>hey you. yeah you. </p>
            <p>
              <b>your music fucking sucks.</b>
            </p>
            <p>
              stop saying you listen to “underground artists” when you got trash
              ass, basic ass, camp flog gnaw lookin ass playlists.
            </p>
            <div className="login">
              <img src={Spotify} alt="spotify icon" className="spotify" />
              <button
                onClick={() => {
                  window.location = window.location.href.includes("localhost")
                    ? "http://localhost:8888/login"
                    : "https://ymtit.herokuapp.com/login";
                }}
                className="btn"
              >
                Sign in with Spotify
              </button>
            </div>
            <p>
              but it’s ok, we’ll make you a playlist with similar, smaller
              artists based on a (shit) playlist you already have
            </p>
          </div>
        </div>
        <script></script>
      </div>
    );
  }
}

export default LandingPage;
