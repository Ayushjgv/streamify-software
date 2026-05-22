import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate= useNavigate();

  return (
    <div className='bg-black w-full h-screen text-white flex justify-center items-center'>
      Landing
      <button onClick={()=>navigate('/home')} className='border bg-blue p-5 cursor-pointer'>Home</button>
    </div>
  )
}

export default Landing
