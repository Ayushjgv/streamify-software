import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import axios from "axios";
import Cards from '../components/Cards';
import Queries from '../components/Queries';

const Home = () => {
  const AnilistAPI = "https://graphql.anilist.co";

  const [trendingList, setTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PopularList, setPopularList] = useState([]);
  const [TopRatedList, setTopRatedList] = useState([]);
  const [AiringList, setAiringList] = useState([]);
  const [UpcomingList, setUpcomingList] = useState([]);
  const [ActionList, setActionList] = useState([]);
  const [RomanceList, setRomanceList] = useState([]);
  const [FantasyList, setFantasyList] = useState([]);
  const [MoviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.post(AnilistAPI, {
          query: Queries.Trending,
        });
        const res2 = await axios.post(AnilistAPI, {
          query: Queries.Popular,
        });
        const res3 = await axios.post(AnilistAPI, {
          query: Queries.TopRated,
        });
        const res4 = await axios.post(AnilistAPI, {
          query: Queries.Airing,
        });
        const res5 = await axios.post(AnilistAPI, {
          query: Queries.Upcoming,
        });
        const res6 = await axios.post(AnilistAPI, {
          query: Queries.Action,
        });
        const res7 = await axios.post(AnilistAPI, {
          query: Queries.Romance,
        });
        const res8 = await axios.post(AnilistAPI, {
          query: Queries.Fantasy,
        });
        const res9 = await axios.post(AnilistAPI, {
          query: Queries.Movies,
        });
        

        setTrendingList(res.data.data.Page.media);
        setPopularList(res2.data.data.Page.media);
        setTopRatedList(res3.data.data.Page.media);
        setAiringList(res4.data.data.Page.media);
        setUpcomingList(res5.data.data.Page.media);
        setActionList(res6.data.data.Page.media);
        setRomanceList(res7.data.data.Page.media);
        setFantasyList(res8.data.data.Page.media);
        setMoviesList(res9.data.data.Page.media);
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
          Movie
        </h2>

        <Cards trendingList={MoviesList} />
      </div>


    </div>
  );
};

export default Home;