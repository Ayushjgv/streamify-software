import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner.jsx";
import axios from "axios";
import Cards from '../components/Cards.jsx'

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
const Queries = {
  
  // Trending Anime
  Trending: `
  query {
    Page(page: 1, perPage: 100) {
      media(sort: TRENDING_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
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
  `,

  // Most Popular Anime
  Popular: `
  query {
    Page(page: 1, perPage: 100) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    description(asHtml: false)
    bannerImage
    coverImage {
      extraLarge
      color
    }
    genres
    averageScore
    popularity
    episodes
    status
  }
  `,

  // Highest Rated Anime
  TopRated: `
  query {
    Page(page: 1, perPage: 100) {
      media(sort: SCORE_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    description(asHtml: false)
    bannerImage
    coverImage {
      extraLarge
      color
    }
    averageScore
    genres
    popularity
    episodes
    seasonYear
  }
  `,

  // Currently Releasing
  Airing: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        status: RELEASING
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
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
    genres
    nextAiringEpisode {
      episode
      timeUntilAiring
    }
  }
  `,

  // Upcoming Anime
  Upcoming: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        status: NOT_YET_RELEASED
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    season
    seasonYear
    genres
  }
  `,

  // Action Anime
  Action: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        genre: "Action"
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    averageScore
    genres
  }
  `,

  // Romance Anime
  Romance: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        genre: "Romance"
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    averageScore
    genres
  }
  `,

  // Fantasy Anime
  Fantasy: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        genre: "Fantasy"
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    averageScore
    genres
  }
  `,

  // Movies
  Movies: `
  query {
    Page(page: 1, perPage: 100) {
      media(
        format: MOVIE
        sort: POPULARITY_DESC
        type: ANIME
      ) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
    }
    bannerImage
    coverImage {
      extraLarge
    }
    averageScore
    duration
    genres
  }
  `,
};

export default Home;