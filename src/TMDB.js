import dotenv from "dotenv";

dotenv.config();

const TMDB = {
  source_api_url: "https://api.themoviedb.org/3/movie/now_playing?api_key=", // now playing movies
  //source_api_url: "https://api.themoviedb.org/3/movie/top_rated?api_key=", // all top rated movies
  api_key: process.env.REACT_APP_TMDB_API_KEY,
  per_page: 10
};

export default TMDB;
