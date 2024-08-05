import React from "react";
import spinners from "../spinners.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={spinners} alt="Loading" />
    </div>
  );
};

export default Spinner;
