import './message.css';
import {format} from 'timeago.js';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Message = ({message, own}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // obtin datele sender-ului
    try {
      const getUser = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}users?userId=${message?.sender}`
        );
        setUser(res.data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [message.sender]);

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={
            user?.profilePict ? user.profilePicture : PF + 'person/noAvatar.png'
          }
          alt=''
        />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
