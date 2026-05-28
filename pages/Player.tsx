// // import React from "react";
// // import { useParams } from "react-router-dom";

// // const Player = () => {
// //   const { id } = useParams();

// //   return (
// //     <div className="h-screen w-full bg-black flex flex-col items-center justify-center gap-4 p-4 text-white">
// //       Player ID: {id}
// //       <button onClick={() => window.history.back()}>Back</button>
// //       <iframe
// //         src={`https://megaplay.buzz/stream/ani/${id}/1/sub`}
// //         allowFullScreen
// //         width="100%"
// //         height="100%"
// //         frameBorder={0}
// //         scrolling="no"
// //       ></iframe>
// //     </div>
// //   );
// // };

// // export default Player;



import React, { useEffect, useState } from "react";
import axios from "axios";
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
      {/* Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img
          src={anime.bannerImage || anime.coverImage.extraLarge}
          alt={title}
          className="h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        <button
          onClick={() => window.history.back()}
          className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md transition hover:bg-black/70"
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
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 lg:flex-row">
        {/* Left */}
        <div className="flex-1">
          {/* Video */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src={`https://megaplay.buzz/stream/ani/${id}/${episode}/sub`}
              allowFullScreen
              width="100%"
              height="700"
              frameBorder={0}
              scrolling="no"
              className="w-full"
            />
          </div>

          {/* Episode Selector */}
          <div className="mt-8">
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
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      episode === ep
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10"
                    }`}
                  >
                    EP {ep}
                  </button>
                );
              })}
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


// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Play,
//   Star,
// } from "lucide-react";

// interface Episode {
//   id: number;
//   number: number;
//   title: string;
// }

// interface AnimeData {
//   title: {
//     english?: string;
//     romaji?: string;
//   };

//   images: {
//     jpg: {
//       large_image_url: string;
//     };
//   };

//   synopsis?: string;
//   episodes?: number;
//   score?: number;
//   genres?: {
//     mal_id: number;
//     name: string;
//   }[];
// }

// const Player = () => {
//   const { id } = useParams();

//   const [anime, setAnime] =
//     useState<AnimeData | null>(null);

//   const [loading, setLoading] = useState(true);

//   const [currentEpisode, setCurrentEpisode] =
//     useState<number>(1);

//   const [recommended, setRecommended] = useState<any[]>(
//     []
//   );

//   useEffect(() => {
//     const fetchAnime = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.jikan.moe/v4/anime/${id}/full`
//         );

//         setAnime(res.data.data);

//         const rec = await axios.get(
//           `https://api.jikan.moe/v4/anime/${id}/recommendations`
//         );

//         setRecommended(rec.data.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnime();
//   }, [id]);

//   const episodes = useMemo(() => {
//     const total = anime?.episodes || 12;

//     return Array.from(
//       { length: total },
//       (_, i) => ({
//         id: i + 1,
//         number: i + 1,
//         title: `Episode ${i + 1}`,
//       })
//     );
//   }, [anime]);

//   if (loading || !anime) {
//     return (
//       <div className="h-screen bg-black flex items-center justify-center text-white">
//         Loading...
//       </div>
//     );
//   }

//   const title =
//     anime.title.english ||
//     anime.title.romaji;

//   return (
//     <div className="h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
//       {/* LEFT SIDEBAR */}
//       <div className="w-[330px] bg-[#111] border-r border-white/10 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-white/10">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>

//           <img
//             src={anime.images.jpg.large_image_url}
//             alt={title}
//             className="mt-4 w-full h-[220px] object-cover rounded-2xl"
//           />

//           <h1 className="mt-4 text-2xl font-bold line-clamp-2">
//             {title}
//           </h1>

//           {/* Score */}
//           <div className="flex items-center gap-2 mt-3 text-yellow-400">
//             <Star size={16} fill="currentColor" />

//             <span className="font-semibold">
//               {anime.score || "N/A"}
//             </span>
//           </div>

//           {/* Genres */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             {anime.genres?.slice(0, 3).map((genre) => (
//               <span
//                 key={genre.mal_id}
//                 className="px-2 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
//               >
//                 {genre.name}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Episodes */}
//         <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
//           {episodes.map((ep) => (
//             <button
//               key={ep.id}
//               onClick={() =>
//                 setCurrentEpisode(ep.number)
//               }
//               className={`w-full rounded-xl p-3 flex items-center gap-3 transition ${
//                 currentEpisode === ep.number
//                   ? "bg-purple-600"
//                   : "bg-white/5 hover:bg-white/10"
//               }`}
//             >
//               <div className="h-10 w-10 rounded-lg bg-black/30 flex items-center justify-center">
//                 <Play size={15} />
//               </div>

//               <div className="flex flex-col text-left">
//                 <span className="font-semibold">
//                   Episode {ep.number}
//                 </span>

//                 <span className="text-xs text-neutral-300">
//                   {ep.title}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {/* Player */}
//         <div className="p-5">
//           <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black">
//             <iframe
//               src={`https://megaplay.buzz/stream/ani/${id}/${currentEpisode}/sub`}
//               width="100%"
//               height="100%"
//               allowFullScreen
//               frameBorder={0}
//             />
//           </div>

//           {/* Info */}
//           <div className="mt-6">
//             <h1 className="text-3xl font-black">
//               {title}
//             </h1>

//             <p className="text-neutral-400 mt-2">
//               Episode {currentEpisode}
//             </p>

//             <p className="mt-5 text-neutral-300 leading-relaxed max-w-4xl">
//               {anime.synopsis}
//             </p>
//           </div>

//           {/* Recommended */}
//           <div className="mt-10">
//             <h2 className="text-2xl font-bold mb-5">
//               Recommended Anime
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//               {recommended
//                 .slice(0, 10)
//                 .map((anime: any) => (
//                   <div
//                     key={anime.entry.mal_id}
//                     className="group cursor-pointer"
//                     onClick={() => {
//                       window.location.href = `/player/${anime.entry.mal_id}`;
//                     }}
//                   >
//                     <div className="overflow-hidden rounded-2xl">
//                       <img
//                         src={anime.entry.images.jpg.large_image_url}
//                         alt={anime.entry.title}
//                         className="h-[260px] w-full object-cover transition duration-300 group-hover:scale-105"
//                       />
//                     </div>

//                     <h3 className="mt-3 font-semibold line-clamp-2">
//                       {anime.entry.title}
//                     </h3>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;