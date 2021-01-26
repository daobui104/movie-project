import React, { Component } from "react";
import "./styles.css";
import LanguageCodes from "./LanguageCodes";
import FilmDetails from "./FilmDetails";
import FilmListing from "./FilmListing";
import FilterMenu from "./FilterMenu";
import TMDB from "./TMDB";

class FilmPage extends Component {
  constructor(props) {
    super();
    this.state = {
      current: {},
      cast: []
    };
  }

  getEnglishCode(alpha2) {
    for (let i = 0; i < LanguageCodes.language.length; i++) {
      if (LanguageCodes.language[i].alpha2 === alpha2) {
        return LanguageCodes.language[i].English;
      }
    }
  }

  getMovieByLanguage(alpha2) {
    const films = [];

    for (let i = 0; i < this.props.films.length; i++) {
      if (this.props.films[i].original_language === alpha2) {
        films.push(this.props.films[i]);
      }
    }

    return films;
  }

  getMovieByYear(alpha2) {
    const films = [];
    for (let i = 0; i < this.props.films.length; i++) {
      if (
        new Date(this.props.films[i].release_date).getFullYear().toString() ===
        alpha2.toString()
      ) {
        films.push(this.props.films[i]);
      }
    }
    return films;
  }

  getMovieTop20() {
    const films = [];
    const sortFilms = this.props.films.sort((a, b) =>
      a.vote_average > b.vote_average ? 1 : -1
    );
    const length = this.props.films.length;
    let j = 0;
    for (let i = 0; i < length; i++) {
      if (sortFilms[length - 1 - i].vote_count > 100) {
        films.push(sortFilms[length - 1 - i]);
        j++;
      }
      if (j > 19) break;
    }
    return films;
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
    const alpha2 = this.props.match.params.alpha2;
    let films = [];
    let headerText = "";
    if (alpha2 === "all") {
      films = this.props.films;
      headerText = "All";
    } else if (alpha2 === "top20") {
      films = this.getMovieTop20();
      headerText = "Top 20";
    } else if (isNaN(alpha2)) {
      films = this.getMovieByLanguage(alpha2);
      headerText = this.getEnglishCode(alpha2);
    } else {
      films = this.getMovieByYear(alpha2);
      headerText = alpha2;
    }

    return (
      <>
        <FilterMenu
          languages={this.props.languages}
          years={this.props.years}
          getEnglishCode={this.getEnglishCode}
          alpha2={alpha2}
        />
        <div className="film-library">
          <FilmListing
            films={films}
            headerText={headerText}
            pageCount={Math.ceil(films.length / TMDB.per_page)}
            offset={0}
            handleDetailsClick={this.handleDetailsClick}
          />
          <FilmDetails film={this.state.current} cast={this.state.cast} />
        </div>
      </>
    );
  }
}
export default FilmPage;
