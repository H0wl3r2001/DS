import React from "react";
import ListingCard from "./ListingCard";


function Listings({ filteredData }) {
  return (
      <div className="pt-3 d-flex align-items-center flex-column">
        {filteredData.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    )
}

export default Listings;
