import React from 'react';
import { AnimeMedia } from '../Home';

interface RowProps {
  title: string;
  animeList: AnimeMedia[];
}

const AnimeRow: React.FC<RowProps> = ({ title, animeList }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold tracking-wide md:text-2xl text-neutral-200">
        {title}
      </h2>
      
      {/* Raw smooth-scroll container */}
      <div className="flex gap-4 overflow-x-scroll pr-4 py-2 scrollbar-none select-none">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="relative min-w-[140px] sm:min-w-[180px] md:min-w-[220px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-neutral-900 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-30 hover:shadow-[0_10px_20px_rgba(0,0,0,0.6)] group"
          >
            <img
              src={anime.coverImage.large}
              alt={anime.title.english || anime.title.romaji}
              className="h-full w-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-xs md:text-sm font-bold text-white line-clamp-2">
                {anime.title.english || anime.title.romaji}
              </p>
              {anime.averageScore && (
                <span className="text-[10px] text-emerald-400 font-bold mt-0.5">
                  ★ {anime.averageScore}% Match
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeRow;