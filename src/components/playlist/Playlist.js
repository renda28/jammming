import React from "react";
import "./Playlist.css";

import TrackList from "../tracklist/TrackList.js";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
