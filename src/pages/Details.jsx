import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost } from '../utility/crudUtility';
import { sanitizeHTML } from '../utility/utils';
import { useConfirm } from 'material-ui-confirm';
import { deletePhoto } from '../utility/uploadFile';

const Details = () => {
    const [post, setPost] = useState(null)
    const [likes, setLikes] = useState(null)

  const navigate = useNavigate()

    const params = useParams()
    console.log(params.id);
    
    useEffect(()=>{
        readPost(params.id, setPost, setLikes)
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

  return (
    <div className='page'>
      <div style={{display:"flex", flexDirection:"column"}}>
        {post && <>
          <img src={post.photo["url"]} alt={post.title} style={{maxWidth:"300px"}}/>
          <div>
            <h2>{post.title}</h2><p className='post_details'>{post.author} - {post.category}</p>
          </div>
          <p>{sanitizeHTML(post.story)}</p>
        </>}
      </div>
      <button>lick 😛</button>
      <button onClick={()=>handleDelete()}>destroy</button>
      <button onClick={()=>navigate("/posts")}>go back</button>
    </div>
  )
}

export default Details