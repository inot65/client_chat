import './profile.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import {useParams} from 'react-router';

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const {username} = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}users?username=${username}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  user?.coverPicture
                    ? user.coverPicture?.includes('cloudinary')
                      ? user?.coverPicture
                      : PF + user?.coverPicture
                    : PF + 'person/noCover.png'
                }
                alt='Imagine de profil'
              />
              <img
                className='profileUserImg'
                src={
                  user?.profilePicture
                    ? user.profilePicture?.includes('cloudinary')
                      ? user?.profilePicture
                      : PF + user?.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt='Poza de profil'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <h4 className='profileInfoDesc'>{user.desc}</h4>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
