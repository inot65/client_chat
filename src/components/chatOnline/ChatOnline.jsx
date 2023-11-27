import {useEffect, useState} from 'react';
import axios from 'axios';
import './chatOnline.css';

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // obtin prietenii
  useEffect(() => {
    try {
      // obtin toate conversatiile userului
      const getFriends = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}users/friends/${currentId}`
        );
        setFriends(res.data);
        // console.log(res.data);
      };
      getFriends();
    } catch (error) {
      console.log(error);
    }
  }, [currentId]);

  // setez prietenii online
  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}conversations/find/${currentId}/${friend._id}`
      );
      // setez noua conversatie curenta
      setCurrentChat(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) => (
        <div
          className='chatOnlineFriend'
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className='chatOnlineImgContainer'>
            <img
              src={
                o?.profilePict ? o.profilePicture : PF + 'person/noAvatar.png'
              }
              className='chatOnlineImg'
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
