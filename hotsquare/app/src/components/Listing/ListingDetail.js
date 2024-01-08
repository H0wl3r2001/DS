import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Badge, Carousel, Spinner } from 'react-bootstrap';
import { BsExclamationCircle } from "react-icons/bs";

import NotFound from '../Error/NotFound';

const ListingDetail = () => {

  const [listing, setListing] = useState(null);
  const [features, setFeatures] = useState([]);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;

    // Try to communicate with sever API
    fetch(`http://localhost:4000/listings/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
        if (isSubscribed) {
          let arr = [];
          if (undefined !== json.features) {
            Object.keys(json.features).forEach(function(key) {
              if (key === 'energyCertificate') {
                arr.push(key.replace('has','').replace(/[A-Z]/g, ' $&').trim() + ': ' + json.features[key]);
              }
              else if (json.features[key]) {
                arr.push(key.replace('has','').replace(/[A-Z]/g, ' $&').trim());
              }
            });
            setFeatures(arr);
          }

          setListing(json);
          setIsError(false);
        }
      })
      .catch((_) => {
        if (isSubscribed) {
          setIsError(true);
          setFeatures([]);
          setListing(null);
        }
      });

    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, [id, listing]);

  if (true === isError) {
    return (
      <NotFound />
    );
  } else {
    if (null == listing) {
      return (
        <Col className='text-center'>
          <Spinner animation="border" />
        </Col>
      );
    } else {
      return (
        <div id='listing-details' className='bg-white py-3 px-4'>
          <Row>
            <div className='d-flex justify-content-between align-items-center'>
              <h2 className='mb-3'>{listing.title + ' - ' + listing.propertyType}</h2>
      
              {'external' === listing.source.type
                ? <a href={listing.url} className='link-info ms-3' target='_blank' rel='noopener noreferrer'>
                    <BsExclamationCircle />
                    {' '}Show on {listing.source.value}...
                  </a>
                : null}
            </div>
          </Row>

          <Row>
            <Col md='5'>
              <Carousel fade>
              {listing.images.map((image, index) =>
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={image} alt={'image ' + index} />
                </Carousel.Item>
              )}
              </Carousel>

              <div className='mt-2 p-2 border rounded border-3 border-custom'>
                <p className='mb-0'>{listing.price} €</p>
                <p className='mb-0'>
                  {listing.size + 'm2 | T'
                  + listing.bedrooms + ' | '
                  + listing.bathrooms + ' bathrooms'
                  + (listing.floor ? '| ' + listing.floor + 'º floor' : '')}
                </p>
              </div>
            </Col>

            <Col md='7'>
              <h4 className='text-muted mt-3 mt-md-0'>Details</h4>
              <p>{listing.description.trim()}</p>

              {features.map((feature) =>
                <React.Fragment key={feature}>
                  <Badge pill className='badge-custom'>{feature}</Badge>{' '}
                </React.Fragment>
              )}
            </Col>
          </Row>
        </div>
      );
    }
  }
};

export default ListingDetail;
