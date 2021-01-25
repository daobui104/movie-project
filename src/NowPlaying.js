import React, { Component } from "react";
import "./styles.css";
import FilmDetails from "./FilmDetails";
import FilmListing from "./FilmListing";
import TMDB from "./TMDB";

class NowPlaying extends Component {
  constructor(props) {
    super();
    this.state = {
      current: {},
      cast: []
    };
  }

  handleDetailsClick = (film) => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    const castUrl = `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${TMDB.api_key}`;
    fetch(movieUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ current: data });
      });

    fetch(castUrl)
      .then((response) => {
        return response.json();
      })
      .then((actor) => {
        this.setState({ cast: actor.cast });
      });
  };
  render() {
    return (
      <div className="film-library">
        <FilmListing
          films={this.props.films}
          handleDetailsClick={this.handleDetailsClick}
        />
        <FilmDetails film={this.state.current} cast={this.state.cast} />
      </div>
    );
  }
}

export default NowPlaying;
