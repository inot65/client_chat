import { useEffect, useState } from 'react';
import axios from 'axios';
import './conversation.css';

const Conversation = ({conversation, currentUserId}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // identific care este userul prieten
    const friendId = conversation.members.find((m) => m !== currentUserId);
    // console.log('friendId :', friendId);

    // gasesc userul acesta
    try {
      // obtin toate conversatiile userului
      const getUser = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}users?userId=${friendId}`
        );
        // console.log(res)
        setUser(res.data);
        // console.log('Prietenul este: ', res.data);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [currentUserId, conversation]);

  return (
    <div className='conversation'>
      <img
        src={
          user?.profilePict
            ? user.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=''
        className='conversationImg'
      />
      <span className='conversationName'>{user?.username}</span>
    </div>
  );
};

export default Conversation;
// http://localhost:8800/images/person/noAvatar.png