import React, { Component } from "react";
import "./styles.css";
import LanguageCodes from "./LanguageCodes";
import { Link } from "react-router-dom";
import FilmDetails from "./FilmDetails";
import FilmListing from "./FilmListing";
import TMDB from "./TMDB";

class ByLanguage extends Component {
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
    if (alpha2 === 0) return null;
    const films = [];
    for (let i = 0; i < this.props.films.length; i++) {
      if (this.props.films[i].original_language === alpha2) {
        films.push(this.props.films[i]);
      }
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
    const films = this.getMovieByLanguage(this.props.match.params.alpha2);
    return (
      <>
        <div>
          <nav>
            <h1>By Language</h1>
            <p>
              {this.props.languages.map((language, index) => {
                return language === this.props.match.params.alpha2 ? (
                  " " + this.getEnglishCode(language) + " | "
                ) : (
                  <Link to={`/bylanguage/${language}`}>
                    {` ${this.getEnglishCode(language)} |`}
                  </Link>
                );
              })}
            </p>
          </nav>
        </div>
        <div className="film-library">
          <FilmListing
            films={films}
            language={this.getEnglishCode(this.props.match.params.alpha2)}
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
export default ByLanguage;
