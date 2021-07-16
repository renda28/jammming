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
    if (!accessToken) {
      this.getAccessToken();
    }
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
          return jsonResponse.tracks.items.map((track) => {
            return {
              ID: track.id,
              Name: track.name,
              Artist: track.artists[0].name,
              Album: track.album.name,
              URI: track.uri,
            };
          });
        } else {
          return [];
        }
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
