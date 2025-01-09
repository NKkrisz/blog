import React from 'react';
import { sanitizeHTML } from '../utility/utils';
import {useNavigate} from "react-router-dom"

const Post = ({post}) => {
  console.log(post);
  const navigate = useNavigate()
  return (
    <div className="post" onClick={()=>navigate("/details/"+post.id)}>
      <button aria-label="More Options">V</button>
      <img alt="Sample Post" src={post.photo.url} />
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        {sanitizeHTML(post.story)}
      </div>
    </div>
  );
};

export default Post;