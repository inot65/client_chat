import './online.css';
import {Link} from 'react-router-dom';

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link
      key={user._id}
      to={'/profile/' + user.username}
      style={{textDecoration: 'none'}}
    >
      <li className='onlineFriend'>
        <div className='onlineProfileImgContainer'>
          <img
            src={
              user?.profilePicture
                ? user.profilePicture?.includes('cloudinary')
                  ? user.profilePicture
                  : PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt='poza profil'
            className='onlineProfileImg'
          />
          <span className='onlineOnline'></span>
        </div>
        <span className='onlineUsername'>{user.username}</span>
      </li>
    </Link>
  );
};

export default Online;
