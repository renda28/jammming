const client_id = "f2c9a9a18b86424da49a0c02335908f2";

const redirect_uri = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const access_token = window.location.href.match(/access_token=([^&]*)/);
    const expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if (access_token && expires_in) {
      accessToken = access_token[1];
      const expirationTime = parseInt(expires_in[1], 10);
      window.setTimeout(() => (accessToken = ""), expirationTime * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      window.location = url;
    }
  },

  async search(searchTerm) {
    this.getAccessToken();
    const url = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(url, headers);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          if (!jsonResponse.tracks) {
            return [];
          }

          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async _getUserID() {
    const access_token = accessToken;
    const url = "https://api.spotify.com/v1/me";
    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(url, headers);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          return jsonResponse;
        }
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async _postPlaylistUsingID(user_id, name) {
    const access_token = accessToken;
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const headers = {
      headers: { Authorization: `Bearer ${access_token}` },
      method: "POST",
      body: JSON.stringify({ name: name }),
    };
    try {
      const response = await fetch(url, headers);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          return jsonResponse;
        }
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async _postTrackURIs(user_id, playlist_id, trackURIs) {
    const access_token = accessToken;
    //const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    const headers = {
      headers: { Authorization: `Bearer ${access_token}` },
      method: "POST",
      body: JSON.stringify({ uris: trackURIs }),
    };
    try {
      const response = await fetch(url, headers);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          console.log("COMPLETE");
          return jsonResponse;
        }
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs) {
      const getUser = await this._getUserID();
      const playlist = await this._postPlaylistUsingID(
        getUser.id,
        playlistName
      );

      /** 
      const result = await this._postTrackURIs(getUser.id, playlist.id, {});
      return result;
      */
    } else {
      return;
    }
  },
};

export default Spotify;
