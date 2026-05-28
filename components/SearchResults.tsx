import React from "react";

interface Anime {
  id: number;
  title: {
    romaji: string;
    english?: string;
  };
  coverImage: {
    large: string;
  };
}

const SearchResults = ({ search }: { search: Anime[] }) => {
  return (
    <div className="absolute top-16 left-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl shadow-2xl">
      {search.length > 0 ? (
        <div className="max-h-[450px] overflow-y-auto">
          {search.map((item) => (
            <div
              key={item.id}
              className="group flex cursor-pointer items-center gap-4 border-b border-white/5 p-3 transition-all duration-200 hover:bg-white/5"
            >
              {/* Cover */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.coverImage.large}
                  alt={item.title.romaji}
                  className="h-[72px] w-[52px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col overflow-hidden">
                <h3 className="truncate text-sm font-semibold text-white">
                  {item.title.romaji}
                </h3>

                {item.title.english && (
                  <p className="truncate text-xs text-neutral-400">
                    {item.title.english}
                  </p>
                )}

                <span className="mt-2 w-fit rounded-full bg-purple-500/10 px-2 py-1 text-[10px] font-medium text-purple-300 border border-purple-500/20">
                  Anime
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 text-sm text-neutral-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchResults;