import React from "react";
import PropTypes from "prop-types";

function FormatNumber(props) {
  return (
    <div>
      {" "}
      {props.price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}
    </div>
  );
}

FormatNumber.propTypes = {};

export default FormatNumber;
