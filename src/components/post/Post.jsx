import './post.css';
import {MoreVert} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const Post = ({post}) => {
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user: currentUser} = useContext(AuthContext);

  const handleLike = () => {
    try {
      axios.put('/posts/' + post._id + '/like', {userId: currentUser._id});
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  // face un efect pentru a marca stare lui isLiked, ca sa stiu daca s-a dat deja like sau nu
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [post.userId]);

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noavatar.png'
                }
                alt='Poza de profil'
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          {post.img && <img className='postImg' src={PF + post.img} alt='' />}
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={PF + 'like.png'}
              alt=''
              onClick={handleLike}
            />
            <img
              className='likeIcon'
              src={PF + 'heart.png'}
              alt=''
              onClick={handleLike}
            />
            <span className='postLikeCounter'>{`${
              like ? like : 0
            } people like it`}</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{`${
              post.comment ? post.comment : 0
            } comments`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
