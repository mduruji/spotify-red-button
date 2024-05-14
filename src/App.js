import logo from './logo.svg';
import './App.css';
import SpotifyGetAlbums from './components/SpotifyGetAlbums/SpotifyGetAlbums';
import {useEffect, useState} from "react";

const CLIENT_ID = "432549a885e745e4a6504ddb00195bd7";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/app";
const SPACE_DELIMITER = "%20";
const SCOPES = [
          "user-read-currently-playing", 
          "user-read-playback-state", 
          "user-library-modify", 
          "user-library-read"
        ];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type
      } = getReturnParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="App">
      <h2>Login to Spotify</h2>
      <button class="loginButton" onClick={handleLogin}>Login to spotify</button>

      <SpotifyGetAlbums></SpotifyGetAlbums>
    </div>
  );

}

export default App;
