import React from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import {Home} from "./Home"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { BarLoader } from 'react-spinners'
import { addPost, readPost } from '../utility/crudUtility'
import CategDropdown from '../components/CategDropDown'
import { CategContext } from '../context/CategContext'
import Alerts from '../components/Alerts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const AddEditPost = () => {
  const {user}=useContext(UserContext)
  const [loading,setLoading]=useState(false)
  const [photo,setPhoto]=useState(null)
  const [story, setStory] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [post, setPost] = useState(null)
  const {register,handleSubmit,formState: { errors }, reset} = useForm()
  const params = useParams()
  console.log(params.id);
  
  useEffect(()=>{
    if(params?.id) readPost(params.id, setPost)
  }, [params?.id])
  
  console.log(post);
  

  const {categories} = useContext(CategContext)
  const [selectedCategory, setSelectedCategory] = useState(null)  

  if(!user) return <Home/>

  const onSubmit=async(data)=>{
    setLoading(true)
    let newPostData = {
      ...data, story, author:user.displayName, userId:user.uid, category:selectedCategory, likes:[]
    }
    
    try {
      const file=data?.file ? data.file[0]:null
      const {url,id}=file ? await uploadFile(file) : null
      delete newPostData.file
      newPostData = {...newPostData, photo:{url, id}}
      console.log(newPostData);
      addPost(newPostData)
      setUploaded(true)
      reset()
      setPhoto(null)
      setStory(null)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='page'>
             <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>A bejegyzés</label>
            <input {...register('title',{required:true})}  type='text' />
            <p className='text-danger'>{errors?.title&&"A cím megadása kötelező."}</p>
          </div>
          <CategDropdown categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
          <Story setStory={setStory} uploaded={uploaded}/>
          <input required type="file" {...register("file",{
            validate:(value)=>{
              if(!value[0]) return true
              const fileExtension = value[0]?.name.split(".").pop().toLowerCase()
              const accaptedFromats=['jpg',"png"]
              if(!accaptedFromats.includes(fileExtension))return "Invalid file format!"
              if(value[0].size>110001024) return "Az engedélyezett fájl márete 1MB"
              return true
            }
          })}
          onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}/>
          <p className='text-danger'>{errors?.file?.message}</p>
          <input disabled={selectedCategory ? false : true} type="submit"/>
        </form>
        {loading&&<BarLoader />}
        {uploaded&&<Alerts txt={"yoipeweeeeee"}/>}
        {photo&&<img src={photo} className='img-thumbnail'/>}
    </div>
  )
} 