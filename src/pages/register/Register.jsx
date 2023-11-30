import {useRef, useContext} from 'react';
// import axios from 'axios';
import {registerCall} from '../../apiCalls';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import './register.css';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  // obtin contextul
  const {isFetching, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    // fac o validare minima doar ca parolele sa fie identice
    // console.log(passwordAgain.current.value, password.current.value);
    if (passwordAgain.current.value !== password.current.value) {
      // stabiles un mesaj de validare personalizat
      password.current.setCustomValidity("Password don't match.");
    } else {
      // totul e OK, urmeaza inregistrarea noului user

      // il inregistrez direct , fara context, pt ca nu vrea sa-l inregistreze
      // direct in contex pe userul nou creat ???
      try {
        registerCall(
          {
            email: email.current.value,
            password: password.current.value,
            username: username.current.value,
          },
          dispatch
        );
        // await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, user);
        // console.log('User creat: ', res.data);
        // fac redirectarea la pagina de login
        return navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    //  navigare catre pagina de 'Login'
    return navigate('/login');
  };

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>ToniSocial - REGISTER</h3>
          <span className='registerDesc'>
            Connect with friends and the world around you on ToniSocial
          </span>
        </div>
        <div className='registerRight'>
          <form className='registerBox' onSubmit={handleClick}>
            <input
              placeholder='username'
              type='text'
              className='registerInput'
              ref={username}
              required
              autoFocus
            />
            <input
              placeholder='email'
              type='email'
              className='registerInput'
              ref={email}
              required
            />
            <input
              placeholder='password'
              type='password'
              className='registerInput'
              ref={password}
              minLength={6}
              required
            />
            <input
              placeholder='password again'
              type='password'
              className='registerInput'
              ref={passwordAgain}
              minLength={6}
              required
            />
            <button
              className='registerButton'
              type='submit'
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color='inherit' size='20px' />
              ) : (
                'Sign Up'
              )}
            </button>
            <button
              className='registerLoginButton'
              disabled={isFetching}
              onClick={handleLogin}
            >
              {isFetching ? (
                <CircularProgress color='inherit' size='20px' />
              ) : (
                'Log into your Account'
              )}
            </button>
          </form>
          {error ? <span className='error'>Ceva nu e bine!</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Register;
