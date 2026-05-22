import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-black w-full h-screen text-white flex justify-center items-center'>
      Home
      <button onClick={()=>navigate('/')}>Landing</button>
    </div>
  )
}

export default Home
