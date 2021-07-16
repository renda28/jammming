import React from "react";
import "./TrackList.css";

import Track from "../track/Track.js";

class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks.map((element) => {
      return (
        <Track
          track={element}
          key={element.id}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
        />
      );
    });
    return <div className="TrackList">{tracks}</div>;
  }
}

export default TrackList;
