import React from 'react';
import { Container, Button } from 'react-bootstrap';
import checklist from '../images/checklist.jpeg';

function HomePage() {
  return (
    <div>
      <img src={checklist} className='bg'/>
      <Container className='py-3'>
        <div className='jumbotron'>
          <h1 className='display-3'>GoalKeeper</h1>
          <p className='lead'>
            Create an account to make new goals and track their completion.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
