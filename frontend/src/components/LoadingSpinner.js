import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return <>
    <Spinner animation='border' role='status' size='sm'/>
    <span className='mx-3'>Loading...</span>
  </>
}

export default LoadingSpinner;
