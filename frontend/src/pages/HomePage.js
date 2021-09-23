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
      <Container className='py-3 text-center'>
        <div className='jumbotron'>
          <h1 className='display-3'>GoalKeeper</h1>
          <p className='lead'>
            GoalKeeper is an application designed to help you keep track of important
            goals and mark their completion.
          </p>
          <p className='lead'>
            Users have the ability to create goals, edit their titles, mark them as
            completed, and delete them.
          </p>
          <hr className='my-3'/>

          {context.accessToken ? <>
            <p className='lead'>
              Visit your goal list to add or track goals.
            </p>
            <Link to='/goals'>
              <Button>View goals</Button>
            </Link>
          </> : <>
            <p className='lead'>
              Create an account to make new goals and track their completion.
            </p>
            <LoginModal/>
          </>}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
