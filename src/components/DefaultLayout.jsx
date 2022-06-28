import React from "react";

export function DefaultLayout(props) {
  return (
    <div>
      <div className="header bs1">
        <div className="d-flex justify-content-between">
          <h1>THIRD EYE RENTALS</h1>
        </div>
      </div>

      <div className="content">{props.children}</div>
    </div>
  );
}
