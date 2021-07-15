import React from "react";
import "./TrackList.css";

import Track from "../track/Track.js";

class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks.map((element) => {
      return <Track track={element} key={element.id} />;
    });
    return (
      <div className="TrackList">
        {/** You will add a map method that renders a set of Track components  */}
        {tracks}
      </div>
    );
  }
}

export default TrackList;
