// import Rightbar from '../../components/rightbar/Rightbar';
// import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import {useRef} from 'react';
import {useContext, useEffect, useState} from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import {AuthContext} from '../../context/AuthContext';
import {io} from 'socket.io-client';

import './messenger.css';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMesssage, setNewMessage] = useState('');
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const {user} = useContext(AuthContext);
  const scroolRef = useRef();

  // fac efect pentru a nu se reconecta de fiecare data cind se rerandeaza componenta
  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    // fac un efect doar pentru receptie de mesaje de la severul socket
    socket.current.on('getMessage', (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket, user._id]);

  //
  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  // efect pentru initializarea comunicarii cu serverul socket
  // si pentru a trimite serverului userId-ul meu
  // voi receptiona lista de utilizatori conectati
  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users?.some((u) => u.userId === f))
      );
    });
  }, [socket, user]);

  useEffect(() => {
    try {
      // obtin toate conversatiile userului
      const getConversations = async () => {
        const res = await axios.get(`conversations/${user._id}`);
        setConversations(res.data);
      };
      getConversations();
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    // obtin toate mesajele din conversatie
    try {
      const getMessages = async () => {
        const res = await axios.get(`messages/${currentChat?._id}`);
        setMessages(res.data);
      };
      getMessages();
    } catch (error) {
      console.log(error);
    }
  }, [currentChat]);

  useEffect(() => {
    scroolRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  // console.log('Chat-ul curent: ', currentChat);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMesssage,
    };

    // gasesc receiverId - catre cine trimit mesajul
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    if (receiverId) {
      // transmit mesajul la serverul socket
      socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId,
        text: newMesssage,
      });
    } else {
      console.log(
        'Nu gasesc receiverId. Nu pot trimite mesajul la serverul socket'
      );
    }

    try {
      // stochez mesajul
      const res = await axios.post(`messages`, message);
      // actualizez mesajele
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input
              type='text'
              placeholder='Search for friends'
              className='chatMenuInput'
            />
            {conversations.map((conv) => (
              <div
                className=''
                key={conv._id}
                onClick={() => setCurrentChat(conv)}
              >
                <Conversation conversation={conv} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <div key={1}>
                <div className='chatBoxTop'>
                  {messages.map((message) => (
                    <div ref={scroolRef} key={message._id}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='write something...'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMesssage}
                  />
                  <button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className='noConversationText'>
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
