// import React from "react";
// import { useNavigate } from "react-router-dom";
// import * as motion from "motion/react-client";

// const FramerMotion = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-black text-white w-full h-screen text-black flex justify-center items-center">
//       Framer
//       {/* normal animation */}


//       {/* <motion.div
//         style={box}
//         animate={{ rotate: 360 , scale:2 ,transition:{duration:2}}}
//         transition={{ duration: 1 }}
//       /> */}


//       {/* openining animation */}


//       {/* <motion.div
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{
//           duration: 0.4,
//           scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
//         }}
//         style={circle}
//        /> */}



//       {/* <motion.button 
//         style={button}
//         whileHover={{scale:1.1}}
//         whileTap={{scale:0.95}}
//       > Click Me </motion.button> */}

//       {/* <motion.div
//         initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
//         whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
//         style={box}
//         /> */}
//     </div>
//   );
// };

// const button = {
//   padding: "10px 20px",
//   backgroundColor: "green",
//   color: "white",
//   border: "none",
//   borderRadius: 5,
//   cursor: "pointer",
// };

// const box = {
//   width: 100,
//   height: 100,
//   backgroundColor: "red",
//   borderRadius: 5,
// };

// const circle = {
//   width: 100,
//   height: 100,
//   backgroundColor: "pink",
//   borderRadius: "50%",
// };

// export default FramerMotion;



import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

export default function ScrollTriggered() {
    return (
        <div style={container}>
            {food.map(([emoji, hueA, hueB], i) => (
                <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
            ))}
        </div>
    )
}

interface CardProps {
    emoji: string
    hueA: number
    hueB: number
    i: number
}

function Card({ emoji, hueA, hueB, i }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants} className="card">
                {emoji}
            </motion.div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
}

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "var(--white)",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
}

/**
 * ==============   Data   ================
 */

const food: [string, number, number][] = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
]
