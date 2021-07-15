import React from "react";
import "./App.css";

import SearchBar from "../searchbar/SearchBar.js";
import SearchResults from "../searchresults/SearchResults.js";
import Playlist from "../playlist/Playlist.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: "a", artist: "b", album: "c", id: "d" },
        { name: "e", artist: "f", album: "g", id: "h" },
      ],
      playlistName: "hello",
      playlistTracks: [{ name: "ab", artist: "cd", album: "ef", id: "gh" }],
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const unique = this.state.playlistTracks.find(
      (savedTrack) => savedTrack.id === track.id
    );

    if (!unique) {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track],
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
