import React from 'react';
import Col from 'react-bootstrap/Col';

const NotFound = () => {

  return (
    <Col className='text-center'>
      <h1 className='display-1 fw-bold'>404</h1>
      <p className='fs-3'> 
        <span className='text-danger'>Opps!</span> Page not found.
      </p>
      <p className='lead'>
          The page you’re looking for doesn’t exist.
        </p>
      <a href='/' className='btn btn-primary'>Go Home</a>  
    </Col>
  );
};
  
export default NotFound;
