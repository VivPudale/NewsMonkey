import React, { Component } from "react";
import spinners from "../spinners.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={spinners} alt="Loading" />
      </div>
    );
  }
}

export default Spinner;
