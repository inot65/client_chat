import './profile.css';
import axios from 'axios';
import {useEffect, useState, useContext} from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import {useParams} from 'react-router';
import {Cancel} from '@mui/icons-material';
import {AuthContext} from '../../context/AuthContext';

const Profile = () => {
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [cover, setCover] = useState(null);

  const [name, setName] = useState(currentUser.username);
  const [desc, setDesc] = useState(currentUser.desc);
  const [city, setCity] = useState(currentUser.city);
  const [from, setFrom] = useState(currentUser.from);

  const [success, setSuccess] = useState(false);

  const [relationship, setRelationship] = useState(currentUser.relationship);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);

    const updatedUser = {
      userId: user._id,
      username: name,
      desc,
      city,
      from,
      relationship,
    };

    if (photo) {
      const data = new FormData();
      data.append('name', photo.name);
      data.append('file', photo);
      data.append('api_key', process.env.REACT_APP_API_KEY);
      data.append('upload_preset', 'upload');

      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/secunia_toni/image/upload',
          data
        );

        updatedUser.profilePicture = uploadRes.data.url;
      } catch (error) {
        console.log('Eroare upload imagine profil : ', error);
      }
    }

    if (cover) {
      const data = new FormData();
      data.append('name', cover.name);
      data.append('file', cover);
      data.append('api_key', process.env.REACT_APP_API_KEY);
      data.append('upload_preset', 'upload');

      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/secunia_toni/image/upload',
          data
        );

        updatedUser.coverPicture = uploadRes.data.url;
      } catch (error) {
        console.log('Eroare upload imagine cover : ', error);
      }
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}users/${user._id}`,
        updatedUser
      );
      // e ca si cum fac login cu success, actualizez userul din context
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
      setSuccess(true);
      setCover(null);
      setPhoto(null);
      window.location.reload();
    } catch (error) {
      console.log('Eroare upload user: ', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              {currentUser.username !== username ? (
                <img
                  className='profileCoverImg'
                  src={
                    user?.coverPicture
                      ? user.coverPicture?.includes('cloudinary')
                        ? user.coverPicture
                        : PF + user.coverPicture
                      : PF + 'person/noCover.png'
                  }
                  alt='Imagine pagina de profil'
                />
              ) : (
                <label className='profileShareOption' htmlFor='cover'>
                  {cover ? (
                    <>
                      <img
                        src={URL.createObjectURL(cover)}
                        className='profileCoverImg'
                        alt='Imagine pagina de profil'
                        style={{cursor: 'pointer'}}
                      />
                      <Cancel
                        className='profileShareCancelImg'
                        onClick={() => {
                          setCover(null);
                        }}
                      />
                    </>
                  ) : (
                    <img
                      className='profileCoverImg'
                      src={
                        user?.coverPicture
                          ? user.coverPicture?.includes('cloudinary')
                            ? user.coverPicture
                            : PF + user.coverPicture
                          : PF + 'person/noCover.png'
                      }
                      alt='Poza de profil'
                      style={{cursor: 'pointer'}}
                    />
                  )}
                  <input
                    style={{display: 'none'}}
                    type='file'
                    id='cover'
                    className='profileShareInput'
                    accept='.png,.jpeg,.jpg,.webp'
                    onChange={(e) => setCover(e.target.files[0])}
                  />
                </label>
              )}
              {currentUser.username !== username ? (
                <img
                  className='profileUserImg'
                  src={
                    user?.profilePicture
                      ? user.profilePicture?.includes('cloudinary')
                        ? user.profilePicture
                        : PF + user.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt='Poza de profil'
                />
              ) : (
                <label className='profileShareOption' htmlFor='file'>
                  {photo ? (
                    <>
                      <img
                        src={URL.createObjectURL(photo)}
                        className='profileUserImg'
                        alt='Poza de profil'
                        style={{cursor: 'pointer'}}
                      />
                      <Cancel
                        className='profileShareCancelImg'
                        onClick={() => {
                          setPhoto(null);
                        }}
                      />
                    </>
                  ) : (
                    <img
                      className='profileUserImg'
                      src={
                        user?.profilePicture
                          ? user.profilePicture?.includes('cloudinary')
                            ? user.profilePicture
                            : PF + user.profilePicture
                          : PF + 'person/noAvatar.png'
                      }
                      alt='Poza de profil'
                      style={{cursor: 'pointer'}}
                    />
                  )}
                  <input
                    style={{display: 'none'}}
                    type='file'
                    id='file'
                    className='profileShareInput'
                    accept='.png,.jpeg,.jpg,.webp'
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              )}
            </div>
            <div className='profileInfo'>
              {currentUser.username !== username ? (
                <>
                  <h4 className='profileInfoName'>{user.username}</h4>
                  <h4 className='profileInfoDesc'>{user.desc}</h4>
                </>
              ) : (
                <>
                  <h4 className='profileInfoName'>{user.username}</h4>
                  <h4 className='profileInfoDesc'>{user.desc}</h4>
                  <form className='profileForm' onSubmit={handleSubmit}>
                    <div className='profileGroupInput'>
                      <label className='profileLabelInput'>Username:</label>
                      <input
                        placeholder='Username'
                        type='text'
                        required
                        autoFocus
                        className='profileInput'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='profileGroupInput'>
                      <label className='profileLabelInput'>Description:</label>
                      <input
                        placeholder='User description'
                        type='text'
                        className='profileInput'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    <div className='profileGroupInput'>
                      <label className='profileLabelInput'>City:</label>
                      <input
                        placeholder='City'
                        type='text'
                        className='profileInput'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className='profileGroupInput'>
                      <label className='profileLabelInput'>From:</label>
                      <input
                        placeholder='from'
                        type='text'
                        className='profileInput'
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                    <div className='profileGroupInput'>
                      <label
                        className='profileLabelInput'
                        htmlFor='relationship'
                      >
                        Relationship:
                      </label>
                      <select
                        name='relationship'
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                      >
                        <option value='1'>Single</option>
                        <option value='2'>Married</option>
                        <option value='3'>Meh...</option>
                      </select>
                    </div>
                    <button className='profileSaveBtn' type='submit'>
                      Update profile
                    </button>
                    {success && (
                      <span
                        style={{
                          color: 'green',
                          textAlign: 'center',
                          marginTop: '10px',
                        }}
                      >
                        Profile has been updated...
                      </span>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
