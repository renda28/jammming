import React from "react";
import "./Track.css";

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name} </h3>
          <p>
            {/**  track artist will go here  | track album will go here */}
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button className="Track-action">
          {this.props.isRemoval ? "-" : "+"}
        </button>
      </div>
    );
  }
}

export default Track;
