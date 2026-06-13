import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();
  const [ToHome, setToHome] = useState(false);


  const handleClick=()=>{
    setToHome(true);

    setTimeout(()=>{
      navigate('/home');
    },1000);
  }

  return (
    <div className="bg-black overflow-hidden text-white w-full h-screen text-black flex justify-center items-center flex-col">
      <motion.div
        style={streamify}
        initial={ToHome ? { scale: 1.7, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={ToHome?{ scale:40,opacity: 0 }:{ scale: 1.7,animationDelay: 0.5, opacity: 1 }}
        transition={ToHome?{duration: 0.9, scale: { type: "spring", bounce: 0.2, visualDuration:0.8 } }:{duration: 2,delay:0.5, scale: { type: "spring", bounce: 0.2, visualDuration:1 } }}
      >STREAMIFY</motion.div>

      <motion.button
        initial={{ scale: 0, opacity: 0 ,y:50}}
        animate={ToHome?{ scale:0,opacity: 0,y:50 }:{ scale:1,opacity: 1,y:0 }}
        whileHover={{scale:1.1 ,transition:{duration:0.1}}}
        whileTap={{scale:0.97}}
        transition={ToHome?{duration: 0.2, scale: { type: "spring", bounce: 0.2, visualDuration:0.8 } }:{duration: 0.5,delay:0.5, scale: { type: "spring", bounce: 0.2, visualDuration:0.8 } }}
        onClick={handleClick}
        style={button}
      >
        Home
      </motion.button>
     {/* <button className='cursor-pointer border p-3 m-3' onClick={()=>navigate('/framer-motion')}>Framer Motion</button> */}
    </div>
  );
};

const streamify: CSSProperties = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "white",
  textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
  background: "linear-gradient(to bottom, #ffffff, #fffff0, #000000)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}
const button: CSSProperties = {
  padding: "10px 20px",
  color: "white",
  border: "1px solid white",
  borderRadius: 5,
  cursor: "pointer",
  marginTop:20,
  fontWeight: 900,
  fontFamily: "Arial, sans-serif",
}
export default Landing;
