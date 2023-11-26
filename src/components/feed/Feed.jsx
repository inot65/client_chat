import {useEffect, useState, useContext} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
// import {Posts} from '../../dummyData.js';
import {AuthContext} from '../../context/AuthContext';

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = username
          ? await axios.get('/posts/profile/' + username)
          : await axios.get('/posts/timeline/' + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [username, user._id]);
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
