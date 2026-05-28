import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface Anime {
  id: number;
  title: {
    romaji: string;
    english?: string;
  };
  coverImage: {
    large: string;
  };
  averageScore?: number;
}

const ANILISTAPI = "https://graphql.anilist.co";

const QUERY = `
query ($search: String, $page: Int) {
  Page(page: $page, perPage: 20) {
    pageInfo {
      hasNextPage
    }

    media(search: $search, type: ANIME) {
      id

      title {
        romaji
        english
      }

      averageScore

      coverImage {
        large
      }
    }
  }
}
`;

const SearchResultList = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch anime
  const fetchAnime = async () => {
    if (!query || loading || !hasNextPage) return;

    setLoading(true);

    try {
      const res = await axios.post(ANILISTAPI, {
        query: QUERY,
        variables: {
          search: query,
          page,
        },
      });

      const newAnime =
        res.data.data.Page.media;

      const nextPage =
        res.data.data.Page.pageInfo.hasNextPage;

      setAnimeList((prev) => [...prev, ...newAnime]);

      setHasNextPage(nextPage);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Initial + pagination fetch
  useEffect(() => {
    fetchAnime();
  }, [page]);

  // Reset when query changes
  useEffect(() => {
    setAnimeList([]);
    setPage(1);
    setHasNextPage(true);
  }, [query]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasNextPage && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, loading]);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-28">
        <h1 className="mb-8 text-3xl font-black tracking-tight">
          Search Results for{" "}
          <span className="text-purple-400">
            "{query}"
          </span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {animeList.map((anime) => (
            <div
              key={anime.id}
              className="group cursor-pointer"
              onClick={()=>navigate(`/player/${anime.id}`)}

            >
              {/* Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.romaji}
                  className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-3">
                <h2 className="line-clamp-1 text-sm font-semibold">
                  {anime.title.romaji}
                </h2>

                {anime.title.english && (
                  <p className="line-clamp-1 text-xs text-neutral-400">
                    {anime.title.english}
                  </p>
                )}

                {anime.averageScore && (
                  <div className="mt-2 inline-flex rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                    ⭐ {anime.averageScore}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          </div>
        )}

        {/* Observer Target */}
        <div ref={observerRef} className="h-10" />

        {/* No Results */}
        {!loading && animeList.length === 0 && (
          <div className="flex justify-center py-20 text-neutral-500">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultList;