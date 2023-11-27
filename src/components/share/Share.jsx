import './share.css';
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@mui/icons-material';
import {useContext, useRef, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

const Share = () => {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // console.log('newPost initial: ', newPost);
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append('name', filename);
      data.append('file', file);
      data.append('api_key', `${process.env.REACT_APP_API_KEY}`);
      data.append('upload_preset', 'upload');

      try {
        // console.log('Data incarcat pe Cloudinary :', data);
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/secunia_toni/image/upload',
          data
        );
        // console.log('Rezultat incarcare imagine :', uploadRes);
        // obtin url-ul unde s-a urcat imaginea pe cloudinary.com
        newPost.img = uploadRes.data.url;
        // console.log('Imagine postare: ', newPost.img);
      } catch (error) {
        console.log('Eroare upload fisier: ', error);
      }
    }
    try {
      await axios.post('/posts', newPost);
      console.log('Postare noua: ', newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user?.profilePicture
                ? user?.profilePicture.includes('cloudinary')
                  ? user.profilePicture
                  : PF + user.profilePicture
                : PF + 'person/noavatar.png'
            }
            alt=''
          />
          <input
            placeholder={"What's in your mind " + user.username + '?'}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img src={URL.createObjectURL(file)} className='shareImg' alt='' />
            <Cancel
              className='shareCancelImg'
              onClick={() => {
                setFile(null);
              }}
            />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label className='shareOption' htmlFor='file'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or Video</span>
              <input
                style={{display: 'none'}}
                type='file'
                name=''
                id='file'
                className='shareInput'
                accept='.png,.jpeg,.jpg,.webp'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
