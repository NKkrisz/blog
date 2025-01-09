import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLike } from '../utility/crudUtility';
import { sanitizeHTML } from '../utility/utils';
import { useConfirm } from 'material-ui-confirm';
import { deletePhoto } from '../utility/uploadFile';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Alerts from '../components/Alerts';

const Details = () => {
  const {user} = useContext(UserContext)
  const [post, setPost] = useState(null)
  const [txt, setTxt] = useState(null)

  const navigate = useNavigate()

    const params = useParams()
    console.log(params.id);
    
    useEffect(()=>{
        readPost(params.id, setPost)
    }, [])

    const confirm = useConfirm()
    
    const handleDelete = async () => {
      try {
        await confirm({
          description : "asdasdasdadhffhfsafjfhdsfkdsfsdfjdshfsdfsf AAAAAAAA",
          confirmationText:"ASDASDSFDSSGSDFGSDFG AAA",
          cancellationText:"no",
          title:"kill this post?"
        })
        deletePost(post.id)
        deletePhoto(post.photo["id"])
        navigate("/")
      } catch (error) {
        console.log(error);
        
      }
    }

    const handleLikes = async () => {
      if(!user){
        setTxt("login pls");
      } else {
        toggleLike(post.id, user.uid)
      }
    }

  return (
    <div className='page'>
      <div style={{display:"flex", flexDirection:"column"}}>
        {post && <>
          <img src={post.photo["url"]} alt={post.title} style={{maxWidth:"300px"}}/>
          <div>
            <h2>{post.title}</h2><p className='post_details'>{post.author} - {post.category}</p>
          </div>
          <p>{sanitizeHTML(post.story)}</p>
          {post && <span>current licks: {post?.likes.length}</span>}
        </>}
      </div>
      <button onClick={()=>handleLikes()}>lick 😛</button>
      {user && post && (user.uid == post.userId) &&
      <>
        <button onClick={()=>handleDelete()}>destroy</button>
        <button onClick={()=>navigate("/update/"+post.id)}>edit</button>
      </>
      } 
      {txt && <Alerts txt={txt} err={false}/>}
      <button onClick={()=>navigate("/")}>go back</button>
    </div>
  )
}

export default Details