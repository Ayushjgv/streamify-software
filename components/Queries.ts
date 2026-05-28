const Queries = {
  
  // Trending Anime
  Trending: `
  query {
    Page(page: 1, perPage: 50) {
      media(sort: TRENDING_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    idMal
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
    Page(page: 1, perPage: 50) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    idMal
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
    Page(page: 1, perPage: 50) {
      media(sort: SCORE_DESC, type: ANIME) {
        ...AnimeFields
      }
    }
  }

  fragment AnimeFields on Media {
    id
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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
    Page(page: 1, perPage: 50) {
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
    idMal
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

export default Queries;
