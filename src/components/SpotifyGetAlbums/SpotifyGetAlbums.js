import React, {useEffect, useState} from "react";
import axios from "axios";
import './SpotifyGetAlbums.css'

const ALBUM_ENDPOINT = "https://api.spotify.com/v1/me/albums?limit=20";
const DELETE_ALBUM_ENDPOINT = "https://api.spotify.com/v1/me/albums?";

function SpotifyGetAlbums() {
    const [token, setToken] = useState("");
    const [albumIds, setAlbumIds] = useState([]);
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    function handleGetAlbumIds () {
      axios
      .get(ALBUM_ENDPOINT, { 
        headers: { 
          Authorization: "Bearer " + token,
        },
      }).then(response => {
        const ids = response.data.items.map(item => item.album.id.toString());
        setAlbumIds(ids);
        console.log("Ablum Ids: ",ids);
      }).catch((error) => {
        console.log(error);
      });
    }

  
    const deleteAlbums = () => {
      handleGetAlbumIds();
      axios.delete(DELETE_ALBUM_ENDPOINT, { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: {
            "ids": albumIds,
        },
      })
      .catch(error => {
          console.error('Error deleting albums:', error);
          throw error;
      });

    }
  
    return (
      <div className="SpotifyGetAlbums">
        <br></br>
        <h2>Press the red button to clear your library</h2>
        <h3>It deletes 20 albums per request</h3>
        <h5>Keep pressing the button til it's all cleared :)</h5>
        <button className="redButton" onClick={ deleteAlbums }>Red Button</button>
      </div>
    );

}

export default SpotifyGetAlbums;