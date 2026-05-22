import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StreamifyHome: React.FC = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleHomeClick = (): void => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/home'); 
    }, 800);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
      
      {/* Ambient background glow effect - fades out on exit */}
      <motion.div 
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* Title Text Pop-up & Netflix-style Exit Scale Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={isExiting 
          ? { 
              scale: 4,               // Massive cinematic zoom
              opacity: [1, 0.8, 0],   // Rapid fade out at the end
              filter: "blur(4px)",    // Camera motion blur simulation
            } 
          : { 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }
        }
        transition={isExiting 
          ? { duration: 0.8, ease: [0.7, 0, 0.14, 1] } // Aggressive cinematic curve
          : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
        className="mb-8 text-6xl font-extrabold tracking-tighter md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 select-none will-change-transform"
      >
        Streamify
      </motion.h1>

      {/* Interactive Modern Button - Slides away gracefully on click */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isExiting ? { opacity: 0, y: 40, scale: 0.9 } : { opacity: 1, y: 0 }}
        transition={isExiting 
          ? { duration: 0.4, ease: "easeIn" } 
          : { delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <button 
          onClick={handleHomeClick}
          disabled={isExiting}
          className="group relative px-8 py-3.5 rounded-full bg-white text-black font-medium tracking-wide transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden disabled:pointer-events-none"
        >
          {/* Inline Shimmer Effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out_infinite] [animation-keyframes:shimmer] [@keyframes_shimmer_{100%{transform:translateX(100%)}}]" />
          
          <span className="relative z-10 flex items-center gap-2">
            Home
            <svg 
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </motion.div>

      {/* Minimalist background grid for visual depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
};

export default StreamifyHome;