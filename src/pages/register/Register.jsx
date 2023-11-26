import {useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './register.css';

const Login = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

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
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      // il inregistrez direct , fara context, pt ca nu vrea sa-l inregistreze
      // direct in contex pe userul nou creat
      try {
        await axios.post('auth/register', user);
        // console.log('User creat: ', res.data);
        // fac redirectarea la pagina de login
        return navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>ToniSocial</h3>
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
            <button className='registerButton' type='submit'>
              Sign Up
            </button>
            <button className='registerRegisterButton'>
              Log into your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
