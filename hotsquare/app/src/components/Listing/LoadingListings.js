import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingListings() {
  return (
    <div className="pt-5 d-flex align-items-center flex-column">
      <Spinner animation="border" />
      <p className="mt-3">Loading our listings...</p>
    </div>
  );
}

export default LoadingListings;
