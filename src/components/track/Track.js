import React from "react";
import "./Track.css";

class Tracks extends React.Component {
  renderButton() {
    return this.props.isRemoval ? <button>-</button> : <button>+</button>;
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{/**  track name will go here */} </h3>
          <p>{/**  track artist will go here  | track album will go here */}</p>
        </div>
        <button className="Track-action">{/**  + or - will go here */}</button>
      </div>
    );
  }
}

export default Tracks;
