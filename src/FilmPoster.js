import React from "react";

export default function FilmPoster(props) {
  const url = "https://image.tmdb.org/t/p/w780/" + props.film.poster_path;
  return <img src={url} alt="" />;
}
