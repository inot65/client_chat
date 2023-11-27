import './rightbar.css';
// import {Users} from '../../dummyData.js';
import Online from '../online/Online';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {Add, Remove} from '@mui/icons-material';
import {useParams} from 'react-router';

const Rightbar = ({userTransmis}) => {
  console.log('User transmis in Rightbar :', userTransmis);
  const {username} = useParams();
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  // obtin userul cu username-ul din params
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `/users?username=${username ? username : currentUser.username}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      getUser();
    }
  }, [username, currentUser.username]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user._id) {
          const res = await axios.get(
            `/users/friends/${user._id ? user._id : currentUser._id}`
          );
          setFriends(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getFriends();
    }
  }, [user, currentUser._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        //follow
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({type: 'UNFOLLOW', payload: user._id});
      } else {
        // unfollow
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({type: 'FOLLOW', payload: user._id});
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src={PF + 'gift.png'} alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends </b>have a birthday today.
          </span>
        </div>
        <img className='rightbarAd' src={PF + 'ad.png'} alt='' />
        <h4 className='rightbarTitle'>OnlineFriends</h4>
        <ul className='rightbarFriendList'>
          {friends.map((user) => (
            <Online key={user._id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {!followed ? 'Follow' : 'Unfollow'}
            {!followed ? <Add /> : <Remove />}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information [{user.username}]</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>
              {user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className='rightbarFollowings'>
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={'/profile/' + friend.username}
              style={{textDecoration: 'none'}}
            >
              <div className='rightbarFollowing'>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=''
                  className='rightbarFollowingImg'
                />
                <span className='rightbarFollowinName'>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {userTransmis !== '' ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
