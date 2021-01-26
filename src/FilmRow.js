import React from "react";
import FilmPoster from "./FilmPoster";

function FilmRow(props) {
  return (
    <div
      className="film-row"
      onClick={() => props.handleDetailsClick(props.film.title)}
    >
      <FilmPoster film={props.film} />
      <div className="film-summary">
        <h1>{props.film.title}</h1>
        <p>{new Date(props.film.release_date).getFullYear()}</p>
        <br />
        <p>Vote Average: {props.film.vote_average}</p>
        <p>Vote Count: {props.film.vote_count}</p>
      </div>
    </div>
  );
}

export default FilmRow;
