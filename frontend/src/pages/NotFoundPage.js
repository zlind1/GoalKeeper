import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import BackgroundImage from '../components/BackgroundImage';

function NotFoundPage() {
  return (
    <div>
      <BackgroundImage/>
      <Container className='py-3'>
        <div className='jumbotron'>
          <h1 className='display-3'>Page not found</h1>
          <Link to='/'>
            <Button>Return to homepage</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
