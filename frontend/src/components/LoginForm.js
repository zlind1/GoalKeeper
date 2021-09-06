import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import AppContext from '../AppContext';

function LoginForm(props) {
  const {closeModal, newUser} = props;

  const context = React.useContext(AppContext);
  const login = (user) => context.setData('user', user);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordShown = () => setPasswordShown(!passwordShown);

  const username = React.createRef();
  const password = React.createRef();

  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const resetErrors = () => {
    setUsernameError('');
    setPasswordError('');
  }
  const checkErrors = (usernameValue, passwordValue) => {
    resetErrors();
    let errorOccurred = false;
    if (usernameValue === '') {
      setUsernameError('This field is required');
      errorOccurred = true;
    }
    if (passwordValue === '') {
      setPasswordError('This field is required');
      errorOccurred = true;
    }
    return errorOccurred;
  }

  React.useEffect(() => resetErrors(), [newUser]);

  const submitForm = async (e) => {
    e.preventDefault();
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    if (checkErrors(usernameValue, passwordValue)) return;
    const user = {
      username: usernameValue
    };
    login(user);
    closeModal();
  }

  return (
    <Form className='user-select-none' onSubmit={submitForm} noValidate>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder='username' ref={username}
          isInvalid={!!usernameError}/>
        <Form.Control.Feedback type='invalid'>
          {usernameError}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control placeholder='password' ref={password}
            type={passwordShown ? 'text' : 'password'}
            isInvalid={!!passwordError}/>
          <InputGroup.Text onClick={togglePasswordShown}>
            {passwordShown ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
          </InputGroup.Text>
          <Form.Control.Feedback type='invalid'>
            {passwordError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <div className='d-grid mt-4'>
        <Button type='submit'>
          {newUser ? 'Sign up' : 'Log in'}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
