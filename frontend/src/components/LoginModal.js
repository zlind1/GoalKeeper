import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AppContext from '../AppContext';
import LoginForm from './LoginForm';

function LoginModal() {
  const context = React.useContext(AppContext);
  const signout = () => context.setData({
    accessToken: null,
    refreshToken: null
  });

  const [newUser, setNewUser] = React.useState(false);
  const toggleNewUser = () => setNewUser(!newUser);

  const [modalShown, setModalShown] = React.useState(false);
  const openModal = () => setModalShown(true);
  const closeModal = () => {
    setModalShown(false);
    setNewUser(false);
  }

  return (
    <>
      <Button onClick={context.accessToken ? signout : openModal}>
        {context.accessToken ? 'Sign out' : 'Log in / Sign up'}
      </Button>
      <Modal show={modalShown} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{newUser ? 'Sign up' : 'Log in'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm closeModal={closeModal} newUser={newUser}/>
        </Modal.Body>
        <Modal.Footer>
          <p className='text-primary' style={{cursor: 'pointer'}}
            onClick={toggleNewUser}>
            {newUser ? 'Existing user? Log in' : 'New user? Sign up'}
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
