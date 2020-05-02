import React from "react";

function DataHeader(props) {
  const headerNames = props.headerNames;
  return headerNames.map((key, index) => {
    let headerVal = null;
    if (index >= 1) {
      headerVal = <th key={index}>{key.toUpperCase()}</th>;
    }
    if (index === 0) {
      headerVal = (
        <th key={index} style={{ textAlign: "center", width: "40px", zIndex: "99" }}></th>
      );
    }
    return headerVal;
  });
}

export default DataHeader;
