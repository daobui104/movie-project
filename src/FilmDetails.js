import React from "react";
import FilmCast from "./FilmCast";

function FilmDetails(props) {
  const backdropUrl = `https://image.tmdb.org/t/p/w1280/${props.film.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w780/${props.film.poster_path}`;

  const allCasts = props.cast.map((actor) => {
    return <FilmCast cast={actor} key={actor.id} />;
  });

  let empty = (
    <div className="film-detail">
      <p>
        <i className="material-icons"></i>
        <span>No film selected</span>
      </p>
    </div>
  );

  let notEmpty = (
    <div className="film-detail is-hydrated">
      <figure className="film-backdrop">
        <img src={backdropUrl} alt="" />
        <h1 className="film-title">{props.film.title}</h1>
      </figure>

      <div className="film-meta">
        <h2 className="film-tagline">{props.film.tagline}</h2>
        <p className="film-detail-overview">
          <img
            src={posterUrl}
            className="film-detail-poster"
            alt={props.film.title}
          />
          {props.film.overview}
        </p>
      </div>
      <div className="film-cast">
        <h2>Cast</h2>

        <table className="cast_list">
          <tbody>{allCasts}</tbody>
        </table>
      </div>
    </div>
  );

  let details = props.film.id ? notEmpty : empty;

  return <div className="film-details">{details}</div>;
}

export default FilmDetails;
