import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ListingsUser from "../../Listing/ListingsUser";
import LoadingListings from "../../Listing/LoadingListings";
import { NEW_PROPERTY } from "./../ProfileScreenMode";
import Alert from "react-bootstrap/Alert";

export default function PublicationsList({
  changeScreenMode,
  propertyOwnerId,
}) {
  const handleNewPostClick = () => {
    changeScreenMode(NEW_PROPERTY);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;

    // Try to communicate with sever API
    fetch(`http://localhost:4000/listings/user/${propertyOwnerId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => (isSubscribed ? setData(json) : null))
      .catch((_) => {
        if (isSubscribed) setData([]);
      });

    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, [data]);

  const isLoading = !data;
  const noResults = data && data.length === 0;

  return (
    <Col>
      <Row>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="skillheader">My Listings</h2>

          <button className="btn-add-custom ms-3" onClick={handleNewPostClick}>
            <BsFillPlusCircleFill size={28} className="me-2" /> Create New
            Listing
          </button>
        </div>
      </Row>

      <Row>
        <Col>
          {isLoading ? (
            <LoadingListings />
          ) : noResults ? (
            <Alert key="secondary" variant="secondary">
              You have no Listing yet.{" "}
              <Alert.Link href="#" onClick={handleNewPostClick}>
                Create your first Listing!
              </Alert.Link>
            </Alert>
          ) : (
            <ListingsUser filteredData={data} />
          )}
        </Col>
      </Row>
    </Col>
  );
}
