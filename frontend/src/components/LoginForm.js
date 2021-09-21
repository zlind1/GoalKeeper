import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import AppContext from '../AppContext';
import api from '../util/api';
import LoadingSpinner from './LoadingSpinner';

function LoginForm(props) {
  const {closeModal, newUser} = props;
  const history = useHistory();
  const [focusToggle, setFocusToggle] = React.useState(false);

  const context = React.useContext(AppContext);
  const login = (tokens) => {
    context.setData(tokens);
    history.push('/goals');
  }

  const [loading, setLoading] = React.useState(false);

  const [passwordShown, setPasswordShown] = React.useState(false);
  const togglePasswordShown = () => setPasswordShown(!passwordShown);

  const username = React.createRef();
  const password = React.createRef();
  const refocus = () => {
    if (usernameError || !passwordError) {
      username.current.focus();
    } else {
      password.current.focus();
    }
  }

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
    setFocusToggle(!focusToggle);
    return errorOccurred;
  }

  React.useEffect(resetErrors, [newUser]);
  React.useEffect(refocus, [focusToggle, username, password, usernameError, passwordError]);

  const submitForm = async (e) => {
    e.preventDefault();
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    if (checkErrors(usernameValue, passwordValue)) return;
    const user = {
      username: usernameValue,
      password: passwordValue
    };
    setLoading(true);
    if (newUser) {
      const response = await api.post('/signup', user);
      if (response.ok) {
        const tokens = {
          accessToken: response.access_token,
          refreshToken: response.refresh_token
        };
        login(tokens);
        closeModal();
      } else {
        if (response.msg === 'Username taken') {
          setUsernameError(response.msg);
        }
        setFocusToggle(!focusToggle);
      }
    } else {
      const response = await api.post('/login', user);
      if (response.ok) {
        const tokens = {
          accessToken: response.access_token,
          refreshToken: response.refresh_token
        };
        login(tokens);
        closeModal();
      } else {
        if (response.msg === 'User not found') {
          setUsernameError(response.msg);
        } else if (response.msg === 'Incorrect password') {
          setPasswordError(response.msg);
        }
        setFocusToggle(!focusToggle);
      }
    }
    setLoading(false);
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
          {loading ? (
            <LoadingSpinner/>
          ) : (
            newUser ? 'Sign up' : 'Log in'
          )}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
