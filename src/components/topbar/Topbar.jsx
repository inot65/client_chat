import './topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const Topbar = () => {
  const {user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{textDecoration: 'none'}}>
          <span className='logo'>ToniSocial</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <SearchIcon className='searchIcon' />
          <input
            type='text'
            className='searchInput'
            placeholder='Cauti prieteni, postari, video...'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <Link to='/' style={{textDecoration: 'none'}}>
            <span className='topbarLink'>Homepage</span>
          </Link>
          <Link to='/messenger' style={{textDecoration: 'none'}}>
            <span className='topbarLink'>Messenger</span>
          </Link>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <PersonIcon />
            <span className='topbarIconBadge'>4</span>
          </div>
          <div className='topbarIconItem'>
            <ChatIcon />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <NotificationsIcon />
            <span className='topbarIconBadge'>3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} className='topbarLink'>
          <img
            src={
              user?.profilePicture
                ? user?.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt='Poza de profil'
            className='topbarImg'
          />
          <span className='topbarUserName no-underline'>{user.username}</span>
        </Link>
        <button
          className='topbarLogout'
          onClick={() => {
            localStorage.removeItem('user');
            dispatch({type: 'LOGOUT'});
            window.location.replace('/');
          }}
        >
          Logout {user.username}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
