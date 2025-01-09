import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { deletePhoto, uploadFile } from '../utility/uploadFile';
import { BarLoader } from 'react-spinners';
import Toastify from "../components/Toastify"
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import { confirm } from 'material-ui-confirm';
import { useConfirm } from 'material-ui-confirm';
import { Home } from './Home';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const { user, updateCredentials, msg, deleteAccount, logoutUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const confirm = useConfirm()
  const navigate = useNavigate()

  useEffect(()=>{
    !user && navigate("/")
  }, [user])

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || '',
    },
  });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const file = data?.file ? data.file[0] : null;
      const {url, id} = file ? await uploadFile(file) : null;

      updateCredentials(data.displayName,url+"/"+id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
    
  };

  const handleDelete = async () => {
    try {
      await confirm({
        description : "asdasdasdadhffhfsafjfhdsfkdsfsdfjdshfsdfsf AAAAAAAA",
        confirmationText:"ASDASDSFDSSGSDFGSDFG AAA",
        cancellationText:"no",
        title:"kill yo self?"
      })

      await deleteAccount()
      await deletePhoto(user.photoURL.split("/")[user.photoURL.length-1])
      logoutUser()
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="page">
      <h3>Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="displayName">User</label>
        <input
          {...register('displayName')}
          placeholder="Username"
          type="text"
          name="displayName"
        />
        <input
          type="file"
          {...register('file', {
            validate: (value) => {
              if (!value[0]) return true;
              const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
              const acceptedFormats = ['jpg', 'png', 'webp', 'gif'];
              if (!acceptedFormats.includes(fileExtension)) return 'Invalid file format';
              if (value[0].size > 1 * 1000 * 1024) return 'File too big';
              return true;
            },
          })}
          onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}
        />
        {errors.file && <p>{errors.file.message}</p>}
        <button type="submit">Submit</button>
        {loading && <BarLoader/>}
        {msg && <Toastify {...msg}/>}
      </form>
      {photo && <img src={photo} alt="Preview" />}
      {avatar && <img src={avatar} alt='avatar'/>}
      <button className="btn btn-danger p-5" onClick={()=>handleDelete()}>rip bozo</button>
    </div>
  );
};
