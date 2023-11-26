import {useContext, useRef} from 'react';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

import './login.css';

const Login = () => {
  const email = useRef();
  const password = useRef();

  // obtin contextul
  const {isFetching, error, dispatch} = useContext(AuthContext);

  const handleClickt = (e) => {
    e.preventDefault();
    loginCall(
      {email: email.current.value, password: password.current.value},
      dispatch
    );
  };

  const handleNewAccount = (e) => {
    e.preventDefault();
    // TODO: de lucrat la navigare catre pagina de 'Register'
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>ToniSocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on ToniSocial
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClickt}>
            <input
              placeholder='Email'
              type='email'
              required
              autoFocus
              ref={email}
              className='loginInput'
            />
            <input
              placeholder='Password'
              ref={password}
              required
              minLength={6}
              type='password'
              className='loginInput'
            />
            <button className='loginButton' disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color='inherit' size='20px' />
              ) : (
                'Log In'
              )}
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <button
              className='loginRegisterButton'
              disabled={isFetching}
              onClick={handleNewAccount}
            >
              {isFetching ? (
                <CircularProgress color='inherit' size='20px' />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
          {error ? <span className='error'>Ceva nu e bine!</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
