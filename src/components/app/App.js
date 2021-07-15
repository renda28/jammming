import React from "react";
import "./App.css";

import SearchBar from "../searchbar/SearchBar.js";
import SearchResults from "../searchresults/SearchResults.js";
import Playlist from "../playlist/Playlist.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };
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
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
