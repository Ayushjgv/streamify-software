

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import {
  ArrowLeft,
  Play,
  Star,
  Tv,
  Calendar,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../components/Cards";

const ANILIST_API = "https://graphql.anilist.co";

const QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id

    title {
      romaji
      english
    }

    description(asHtml: false)

    bannerImage

    coverImage {
      extraLarge
    }

    averageScore

    episodes

    status

    seasonYear

    genres

    recommendations(sort: RATING_DESC) {
      nodes {
        mediaRecommendation {
          id

          title {
            romaji
            english
          }

          averageScore

          episodes

          genres

          coverImage {
            extraLarge
            large
          }
        }
      }
    }
  }
}
`;

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState<any>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [episode, setEpisode] = useState<number>(1);
  const [SubDub, setSubDub] = useState<any>('sub');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.post(ANILIST_API, {
          query: QUERY,
          variables: {
            id: Number(id),
          },
        });

        const media = res.data.data.Media;

        setAnime(media);

        const recommendations =
          media.recommendations.nodes.map(
            (item: any) => item.mediaRecommendation
          );

        setRecommended(recommendations);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const title =
    anime.title.english || anime.title.romaji;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* navbar */}
      <Navbar />

      {/* Banner */}
      <div className="relative h-[50vh] w-full overflow-hidden ">
        <img
          src={anime.bannerImage || anime.coverImage.extraLarge}
          alt={title}
          className="h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        <button
          onClick={() => window.history.back()}
          className="absolute left-5 top-20 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md transition hover:bg-black/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="absolute bottom-8 left-8 flex gap-6">
          <img
            src={anime.coverImage.extraLarge}
            alt={title}
            className="hidden md:block h-[240px] rounded-2xl shadow-2xl"
          />

          <div className="flex flex-col justify-end">
            <h1 className="max-w-2xl text-4xl md:text-6xl font-black tracking-tight">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-300">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                {anime.averageScore || "N/A"}%
              </div>

              <div className="flex items-center gap-1">
                <Tv className="h-4 w-4" />
                {anime.episodes || "?"} Episodes
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {anime.seasonYear || "Unknown"}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {anime.genres?.map((genre: string) => (
                <span
                  key={genre}
                  className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex  flex-col gap-10 px-4 py-8 lg:flex-row justify-between">

        {/* Episode Selector */}
        <div className="mt-8 w-full lg:w-[320px] overflow-auto h-165 scrollbar-none">
          <div className="mb-5 flex items-center gap-3">
            <Play className="h-5 w-5 text-purple-400" />

            <h2 className="text-2xl font-bold">
              Episodes
            </h2>
          </div>



          <div className="flex flex-wrap gap-3">
            {Array.from({
              length: anime.episodes || 12,
            }).map((_, index) => {
              const ep = index + 1;

              return (
                <button
                  key={ep}
                  onClick={() => setEpisode(ep)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${episode === ep
                    ? "bg-purple-600 text-white cursor-pointer"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10 cursor-pointer"
                    }`}
                >
                  EP {ep}
                </button>
              );
            })}
          </div>
        </div>

        {/* Player */}
        <div className="flex-1">
          {/* Video */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src={`https://megaplay.buzz/stream/ani/${id}/${episode}/${SubDub}`}
              allowFullScreen
              width="100%"
              height="700"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              frameBorder={0}
              scrolling="no"
              className="w-full"
            />
          </div>

          {/* language */}

          <div className="pb-5 flex-col flex gap-2 mt-5">
            <div className="mb-5 flex items-center gap-3">
              <Play className="h-5 w-5 text-purple-400" />

              <h2 className="text-2xl font-bold">
                Languages
              </h2>
            </div>
            <div>
              <button
                onClick={() => setSubDub('sub')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${SubDub === 'sub'
                  ? "bg-purple-600 text-white cursor-pointer"
                  : "bg-white/5 text-neutral-300 hover:bg-white/10 cursor-pointer"
                  }`}
              >
                SUB
              </button>
              <button
                onClick={() => setSubDub('dub')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${SubDub === 'dub'
                  ? "bg-purple-600 text-white cursor-pointer"
                  : "bg-white/5 text-neutral-300 hover:bg-white/10 cursor-pointer"
                  }`}
              >
                DUB
              </button>
            </div>

          </div>


          {/* Description */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Synopsis
            </h2>

            <p className="leading-7 text-neutral-300">
              {anime.description
                ?.replace(/<[^>]+>/g, "")
                ?.slice(0, 800)}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <div className="sticky top-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-5 text-2xl font-bold">
              Recommended
            </h2>

            <div className="space-y-4">
              {recommended.slice(0, 8).map((anime) => {
                const title =
                  anime.title.english ||
                  anime.title.romaji;

                return (
                  <div
                    key={anime.id}
                    onClick={() =>
                      navigate(`/player/${anime.id}`)
                    }
                    className="group flex cursor-pointer gap-4 rounded-2xl p-2 transition hover:bg-white/5"
                  >
                    <img
                      src={anime.coverImage.large}
                      alt={title}
                      className="h-24 w-16 rounded-xl object-cover"
                    />

                    <div className="flex flex-col justify-center">
                      <h3 className="line-clamp-2 text-sm font-bold group-hover:text-purple-300">
                        {title}
                      </h3>

                      <p className="mt-1 text-xs text-neutral-400">
                        ⭐ {anime.averageScore || "N/A"}%
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {anime.episodes || "?"} Episodes
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* More Like This */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-3xl font-black">
          More Like This
        </h2>

        <Cards trendingList={recommended} />
      </div>
    </div>
  );
};

export default Player;
