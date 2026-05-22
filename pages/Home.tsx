// import React,{ useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HeroBanner from '../components/HeroBanner.jsx';
// import axios from 'axios';

// const Home = () => {
//   const navigate = useNavigate();
//   const AnilistAPI = 'https://graphql.anilist.co';

//   const [TrendingList, setTrendingList] = useState([]);

//   useEffect(() => {
//     const fetchTrending = async () => {
//       const res = await axios.post(AnilistAPI, {
//         query: Queries.Trending,
//       });
//       setTrendingList(res.data.data.Page.media);
//       console.log(res.data.data.Page.media);
//     };

//     fetchTrending();
//   }, []);
  

//   return (
//     <div className='bg-black w-full h-screen text-white flex justify-center items-center flex-col'>
//      <div className='flex-1'>Banner</div>
//      <div className='flex-2'>bottom container</div> 
//     </div>
//   )
// }


// const Queries ={
//   Trending:`
//   query {
//       Page(page: 1, perPage: 20) {
//         media(sort: TRENDING_DESC, type: ANIME) {
//           id
//           title {
//             romaji
//             english
//             native
//           }
//           description(asHtml: false)
//           bannerImage
//           coverImage {
//             extraLarge
//             large
//             medium
//             color
//           }
//           episodes
//           duration
//           genres
//           averageScore
//           popularity
//           trending
//           status
//           season
//           seasonYear
//           format
//           source
//           countryOfOrigin
//           studios(isMain: true) {
//             nodes {
//               name
//             }
//           }
//           trailer {
//             id
//             site
//             thumbnail
//           }
//           nextAiringEpisode {
//             episode
//             timeUntilAiring
//           }
//         }
//       }
//     }
//   `,
//   Top:`

//   `,
//   Popular:`

//   `,
// }

// export default Home



import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner.jsx";
import axios from "axios";

const Home = () => {
  const AnilistAPI = "https://graphql.anilist.co";

  const [trendingList, setTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.post(AnilistAPI, {
          query: Queries.Trending,
        });

        setTrendingList(res.data.data.Page.media);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="bg-black w-full h-screen flex justify-center items-center">
        <div className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      
      {/* Netflix Hero Banner */}
      <HeroBanner trendingAnime={trendingList} />

      {/* Trending Section */}
      <div className="relative z-20 -mt-20 px-4 md:px-10 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Trending Now
        </h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {trendingList.map((anime) => (
            <div
              key={anime.id}
              className="min-w-[180px] md:min-w-[240px] group cursor-pointer transition duration-300 hover:scale-105"
            >
              {/* Poster */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.english || anime.title.romaji}
                  className="w-full h-[260px] md:h-[340px] object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />
              </div>

              {/* Anime Info */}
              <div className="mt-3">
                <h3 className="font-bold text-sm md:text-lg line-clamp-1">
                  {anime.title.english || anime.title.romaji}
                </h3>

                <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                  <span>{anime.averageScore}%</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

const Queries = {
  Trending: `
  query {
    Page(page: 1, perPage: 20) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description(asHtml: false)
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        episodes
        duration
        genres
        averageScore
        popularity
        trending
        status
        season
        seasonYear
        format
        source
        countryOfOrigin

        studios(isMain: true) {
          nodes {
            name
          }
        }

        trailer {
          id
          site
          thumbnail
        }

        nextAiringEpisode {
          episode
          timeUntilAiring
        }
      }
    }
  }
  `,
};

export default Home;