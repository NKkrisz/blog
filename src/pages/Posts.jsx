import React from 'react'
import Post from '../components/Post'
import FilterChips from '../components/FilterChips'
import { useState } from 'react'
import { readPosts } from '../utility/crudUtility'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Posts = () => {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])
  console.log(searchParams.get("ctg"))
  
  useEffect(()=>{
    readPosts(setPosts, selectedCategories)    
  },[selectedCategories])
  return (
    <div className='page'>
      <FilterChips selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
      <div className="posts-container">
        {posts&&posts.map(post=><Post key={post.title} post={post}/>)}
      </div>
    </div>
  )
}


