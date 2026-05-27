import React from "react";
import { useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center gap-4 p-4 text-white">
      Player ID: {id}
      <button onClick={() => window.history.back()}>Back</button>
      <iframe
        src={`https://megaplay.buzz/stream/ani/${id}/1/sub`}
        allowFullScreen
        width="100%"
        height="100%"
        frameBorder={0}
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Player;
