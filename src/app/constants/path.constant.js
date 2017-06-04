'use strict';
module.exports = {
  'API': 'https://api.themoviedb.org/3/',
  'IMG': 'https://image.tmdb.org/t/p/{size}',
  'METHODS': {
    // movies
    nowPlayingMovies: 'movie/now_playing',
    popularMovies: 'movie/popular',
    upcomingMovies: 'movie/upcoming',

    // movie
    movie: 'movie/{id}',
    movieCredits: 'movie/{id}/credits',
    movieGallery: 'movie/{id}/images',
    movieVideos: 'movie/{id}/videos',

    // cast and crew
    person: 'person/{id}',
    personPhotos: 'person/{id}/images',
    personCredits: 'person/{id}/movie_credits',

    // search
    searchMovies: 'search/movie',
    searchTv: 'search/tv',
    searchPeople: 'search/person',

    // tv
    tv: 'tv/{id}',
    tvCredits: 'tv/{id}/credits',
    tvGallery: 'tv/{id}/images',
    tvVideos: 'tv/{id}/videos',
  }
};