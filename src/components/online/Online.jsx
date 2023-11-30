import './online.css';

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
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
  );
};

export default Online;
