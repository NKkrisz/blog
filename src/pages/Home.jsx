import React from 'react'
import CustomCard from '../components/CustomCard'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'

export const Home = () => {
  const {categories} = useContext(CategContext)
  console.log(categories);
  
  return (
    <div className='page'>
      <h1>AAAAAA</h1>
      <div id='cards'>
        {categories&&categories.map(category=><CustomCard {...category}/>)}
      </div>
      <div style={{backgroundColor:"var(--custom_blue)", marginBottom:"-150px"}}>
        <h2>AAAAAAAAAAAAAAAAAA</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nobis, praesentium asperiores aspernatur, quia et dolor provident fugit omnis laborum consectetur eos impedit sunt! Ducimus voluptatibus repudiandae dolores iusto totam.</p>
        <p>made with AAAAAAAAA</p>
      </div>
    </div>
  )
}

