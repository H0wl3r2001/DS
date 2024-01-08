import React from "react";
import ListingCardUser from "./ListingCardUser";
import { Row } from "react-bootstrap";


function ListingsUser({ filteredData }) {
  return (
      <Row className="pt-3">
        {filteredData.map((listing) => (
          <ListingCardUser key={listing._id} listing={listing} />
        ))}
      </Row>
    )
}

export default ListingsUser;
