import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import AppContext from '../AppContext';
import LoginModal from '../components/LoginModal';
import BackgroundImage from '../components/BackgroundImage';

function HomePage() {
  const context = React.useContext(AppContext);
  return (
    <div>
      <BackgroundImage/>
      <Container className='py-3'>
        <div className='jumbotron'>
          <h1 className='display-3'>GoalKeeper</h1>
          <p className='lead'>
            Create an account to make new goals and track their completion.
          </p>
          {context.accessToken ? (
            <Link to='/goals'>
              <Button>View goals</Button>
            </Link>
          ) : (
            <LoginModal/>
          )}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
