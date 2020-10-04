import React, { Component } from "react";
import Shoes from "./assets/img1.png";
import Shirt from "./assets/img2.png";
import Album from "./assets/img3.png";
import Spotify from "./assets/spotify.png";

class LandingPage extends Component {
  state = {
    imageCount: 0,
  };

  componentDidMount() {
    this.pictureChanger();
    this.interval = setInterval(this.pictureChanger(), 3000);
  }

  pictureChanger() {
    let images = [Shoes, Album, Shirt];
    let x = this.state.imageCount;
    let img = document.getElementById("img");
    img.src = images[x];
    x++;
    if (x >= images.length) {
      x = 0;
    }
  }

  render() {
    return (
      <div>
        <div className="row header">
          <h1>your music taste is trash</h1>
          <div>
            <img id="img" src={Shoes} alt="trashshoes" />
            {/*             <img id="img" src={Shirt} alt="trashshirt" />
            <img id="img" src={Album} alt="trashalbum" /> */}
          </div>
        </div>
        <h2>“yO lEt mE pUt oN sOmE mUsIc U aIn’T nEvEr hEaRd bEfOrE.” - you</h2>
        <div>
          <div className="content">
            <p>hey you. yeah you. </p>
            <p>
              <b>your music fucking sucks.</b>
            </p>
            <p>
              stop saying you listen to “underground artists” when you got trash
              ass, basic ass, camp flog gnaw lookin ass playlists.
            </p>
            <div className="login">
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
