import { useEffect,useState } from "react";
import Player from "../pages/Player";
import { useNavigate } from "react-router-dom";



const Cards = ({ trendingList }: CardsProps) => {

  const navigate = useNavigate();


  return (
    <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
      {trendingList.map((anime) => {
        const title = anime.title.english || anime.title.romaji;

        return (
        <div
          key={anime.id}
          className="min-w-[180px] md:min-w-[240px] group cursor-pointer transition duration-300 hover:scale-105"
          onClick={()=>navigate(`/player/${anime.id}`)}
        >
          {/* Poster */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={anime.coverImage.extraLarge || anime.coverImage.large || anime.coverImage.medium || ""}
              alt={title}
              className="w-full h-[260px] md:h-[340px] object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />
          </div>

          {/* Anime Info */}
          <div className="mt-3">
            <h3 className="font-bold text-sm md:text-lg line-clamp-1">
              {title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
              <span>{anime.averageScore ? `${anime.averageScore}%` : "N/A"}</span>
              <span>{anime.episodes || "?"} EP</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-2">
              {anime.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default Cards;
