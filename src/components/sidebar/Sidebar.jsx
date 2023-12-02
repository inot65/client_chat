import './sidebar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import {
  School,
  Event,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
} from '@mui/icons-material';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import {Users} from '../../dummyData.js';
import CloseFriend from '../closeFriend/CloseFriend';
import {useEffect, useState} from 'react';

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  // obtin prietenii
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}users/all`
        );
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <RssFeedIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarListItem'>
            <Chat className='sidebarIcon' />
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li className='sidebarListItem'>
            <PlayCircleFilledOutlined className='sidebarIcon' />
            <span className='sidebarListItemText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <Group className='sidebarIcon' />
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <Bookmark className='sidebarIcon' />
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <HelpOutline className='sidebarIcon' />
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <WorkOutline className='sidebarIcon' />
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <Event className='sidebarIcon' />
            <span className='sidebarListItemText'>Events</span>
          </li>
          <li className='sidebarListItem'>
            <School className='sidebarIcon' />
            <span className='sidebarListItemText'>Courses</span>
          </li>
        </ul>
        <button className='sidebarButton'>Arata mai mult</button>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendList'>
          {users.map((user) => (
            <Link
              key={user.id}
              to={'/profile/' + user.username}
              style={{textDecoration: 'none'}}
            >
              <CloseFriend user={user} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
