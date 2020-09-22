import React, { Component } from "react";
import Shoes from "./assets/trashshoes.png";
import Shirt from "./assets/trashshirt.png";
import Album from "./assets/trashalbum.png";
import Spotify from "./assets/spotify.png";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row header">
          <h1>your music taste is trash</h1>
          <div>
            <img src={Shoes} alt="trashshoes" />
            <img src={Shirt} alt="trashshirt" />
          </div>
        </div>
        <h2>“yO lEt mE pUt oN sOmE mUsIc U aIn’T nEvEr hEaRd bEfOrE.” - you</h2>
        <div>
          <p>
            hey you. yeah you. your music fucking sucks stop saying you listen
            to “underground artists” when you got trash ass, basic ass, camp
            flog gnaw lookin ass playlists.{" "}
          </p>
        </div>
        <img src={Spotify} alt="spotify icon" />
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
        <img src={Album} alt="trashalbum" />
        <p>
          but it’s ok, we’ll make you a playlist with similar, smaller artists
          based on a (shit) playlist you already have
        </p>
      </div>
    );
  }
}

export default LandingPage;
