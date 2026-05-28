// import React, { useState, useEffect } from "react";
// import HeroBanner from "../components/HeroBanner";
// import axios from "axios";
// import Cards from "../components/Cards";
// import Queries from "../components/Queries";
// import Navbar from "../components/Navbar";

// const Home = () => {
//   // const AnilistAPI = "https://streamify-software.onrender.com";
//   const AnilistAPI = "http://localhost:3000/animelist";


//   const [trendingList, setTrendingList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [PopularList, setPopularList] = useState([]);
//   const [TopRatedList, setTopRatedList] = useState([]);
//   const [AiringList, setAiringList] = useState([]);
//   const [UpcomingList, setUpcomingList] = useState([]);
//   const [ActionList, setActionList] = useState([]);
//   const [RomanceList, setRomanceList] = useState([]);
//   const [FantasyList, setFantasyList] = useState([]);
//   const [MoviesList, setMoviesList] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         // Define all your requests in an array
//         const requests = [
//           axios.post(AnilistAPI, { query: Queries.Trending, type: "trending" }),
//           axios.post(AnilistAPI, { query: Queries.Popular, type: "popular" }),
//           axios.post(AnilistAPI, { query: Queries.TopRated, type: "topRated" }),
//           axios.post(AnilistAPI, { query: Queries.Airing, type: "airing" }),
//           axios.post(AnilistAPI, { query: Queries.Upcoming, type: "upcoming" }),
//           axios.post(AnilistAPI, { query: Queries.Action, type: "action" }),
//           axios.post(AnilistAPI, { query: Queries.Romance, type: "romance" }),
//           axios.post(AnilistAPI, { query: Queries.Fantasy, type: "fantasy" }),
//           axios.post(AnilistAPI, { query: Queries.Movies, type: "movies" }),
//         ];

//         // Fire them all concurrently
//         const [
//           resTrending,
//           resPopular,
//           resTopRated,
//           resAiring,
//           resUpcoming,
//           resAction,
//           resRomance,
//           resFantasy,
//           resMovies,
//         ] = await Promise.all(requests);

//         // Update states
//         setTrendingList(resTrending.data.data.Page.media);
//         setPopularList(resPopular.data.data.Page.media);
//         setTopRatedList(resTopRated.data.data.Page.media);
//         setAiringList(resAiring.data.data.Page.media);
//         setUpcomingList(resUpcoming.data.data.Page.media);
//         setActionList(resAction.data.data.Page.media);
//         setRomanceList(resRomance.data.data.Page.media);
//         setFantasyList(resFantasy.data.data.Page.media);
//         setMoviesList(resMovies.data.data.Page.media);
//       } catch (err) {
//         console.error("Error fetching anime lists:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-black w-full h-screen flex justify-center items-center">
//         <div className="text-white text-2xl font-bold animate-pulse">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden flex flex-col">
//       <Navbar />

//       {/* Netflix Hero Banner */}
//       <HeroBanner trendingAnime={trendingList} />

//       {/* Trending Section */}
//       <div className="relative z-20 -mt-20 px-4 md:px-10 pb-10">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Now</h2>

//         <Cards trendingList={trendingList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular</h2>

//         <Cards trendingList={PopularList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Rated</h2>

//         <Cards trendingList={TopRatedList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Airing</h2>

//         <Cards trendingList={AiringList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Upcoming</h2>

//         <Cards trendingList={UpcomingList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Action</h2>

//         <Cards trendingList={ActionList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Romance</h2>

//         <Cards trendingList={RomanceList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Fantasy</h2>

//         <Cards trendingList={FantasyList} />
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Movie</h2>

//         <Cards trendingList={MoviesList} />
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, {
  useState,
  useEffect,
} from "react";

import HeroBanner from "../components/HeroBanner";
import Cards from "../components/Cards";
import Queries from "../components/Queries";
import Navbar from "../components/Navbar";

const Home = () => {
  const [trendingList, setTrendingList] =
    useState([]);

  const [PopularList, setPopularList] =
    useState([]);

  const [TopRatedList, setTopRatedList] =
    useState([]);

  const [AiringList, setAiringList] =
    useState([]);

  const [UpcomingList, setUpcomingList] =
    useState([]);

  const [ActionList, setActionList] =
    useState([]);

  const [RomanceList, setRomanceList] =
    useState([]);

  const [FantasyList, setFantasyList] =
    useState([]);

  const [MoviesList, setMoviesList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trending,
          popular,
          topRated,
          airing,
          upcoming,
          action,
          romance,
          fantasy,
          movies,
        ] = await Promise.all([
          window.electronAPI.getAnimeList(
            Queries.Trending,
            "trending"
          ),

          window.electronAPI.getAnimeList(
            Queries.Popular,
            "popular"
          ),

          window.electronAPI.getAnimeList(
            Queries.TopRated,
            "topRated"
          ),

          window.electronAPI.getAnimeList(
            Queries.Airing,
            "airing"
          ),

          window.electronAPI.getAnimeList(
            Queries.Upcoming,
            "upcoming"
          ),

          window.electronAPI.getAnimeList(
            Queries.Action,
            "action"
          ),

          window.electronAPI.getAnimeList(
            Queries.Romance,
            "romance"
          ),

          window.electronAPI.getAnimeList(
            Queries.Fantasy,
            "fantasy"
          ),

          window.electronAPI.getAnimeList(
            Queries.Movies,
            "movies"
          ),
        ]);

        setTrendingList(trending);
        setPopularList(popular);
        setTopRatedList(topRated);
        setAiringList(airing);
        setUpcomingList(upcoming);
        setActionList(action);
        setRomanceList(romance);
        setFantasyList(fantasy);
        setMoviesList(movies);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden flex flex-col">
      <Navbar />

      <HeroBanner
        trendingAnime={trendingList}
      />

      <div className="relative z-20 -mt-20 px-4 md:px-10 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Trending Now
        </h2>

        <Cards trendingList={trendingList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Popular
        </h2>

        <Cards trendingList={PopularList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Top Rated
        </h2>

        <Cards trendingList={TopRatedList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Airing
        </h2>

        <Cards trendingList={AiringList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Upcoming
        </h2>

        <Cards trendingList={UpcomingList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Action
        </h2>

        <Cards trendingList={ActionList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Romance
        </h2>

        <Cards trendingList={RomanceList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Fantasy
        </h2>

        <Cards trendingList={FantasyList} />

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Movies
        </h2>

        <Cards trendingList={MoviesList} />
      </div>
    </div>
  );
};

export default Home;