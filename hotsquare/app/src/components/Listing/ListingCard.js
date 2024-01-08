import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap/";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const navigateToListingDetails = (event) => {
    if (null === event.target.getAttribute('href')) {
      navigate(`/listings/${listing._id}`);
    }
  };

  return (
    <Col md={6} lg={9} className='pb-3 listing-card' onClick={navigateToListingDetails}>
      <Card className='h-100'>
      <Row>
       <Col xs>
          <Card.Img variant="top" src={listing.thumbnail} alt={listing.title} />
        </Col>
        <Col xs>
          <Card.Body>
            <Card.Title>{listing.location + ' (T' + listing.bedrooms + ')'} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Price: {listing.price}€ per month
            </Card.Subtitle>
            {'external' === listing.source.type
              ? <Card.Link href={listing.url} target='_blank' rel='noopener noreferrer'>
                  See on {listing.source.value}
                </Card.Link>
              : null
            }
          </Card.Body>
        </Col>
       </Row>
      </Card>
    </Col>
  );
};

export default ListingCard;
