import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./styles.css";
import NowPlaying from "./NowPlaying.js";
import ByYear from "./ByYear";
import Home from "./Home";
import ByLanguage from "./ByLanguage";
import TMDB from "./TMDB";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      films: [],
      current: {},
      cast: [],
      years: [],
      languages: []
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB.api_key}`
    )
      .then((response) => {
        return response.json();
      })
      .then((pages) => {
        for (let page = 0; page < pages.total_pages; page++) {
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB.api_key}&page=${page}`
          )
            .then((response) => {
              return response.json();
            })
            .then((now) => {
              let years = this.getYears(now.results);
              let languages = this.getLanguages(now.results);

              this.setState({
                films: [...this.state.films, ...now.results],
                years: [...this.state.years, ...years].sort(),
                languages: [...this.state.languages, ...languages].sort()
              });
              //console.log("state year: " + this.state.years);
              //console.log("state languages: " + this.state.languages);
            })
            .catch((ex) => {
              console.log(ex);
            });
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  getYears(films) {
    let years = [];

    for (let i = 0; i < films.length; i++) {
      let year = new Date(films[i].release_date).getFullYear();

      if (this.state.years.indexOf(year) < 0 && years.indexOf(year) < 0) {
        years.push(year);
      }
    }

    return years;
  }

  getLanguages(films) {
    let languages = [];

    for (let i = 0; i < films.length; i++) {
      let language = films[i].original_language;

      if (
        this.state.languages.indexOf(language) < 0 &&
        languages.indexOf(language) < 0
      ) {
        languages.push(language);
      }
    }
    return languages;
  }

  // getEnMovies(films) {
  //   for (let i = 0; i < films.length; i++) {
  //     if (films[i].original_language !== "en") {
  //       films.splice(i, 1);
  //     }
  //   }
  //   return films;
  // }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link> <Link to="/all">All</Link>{" "}
            <Link to="/byyear">By Year</Link>{" "}
            <Link to="/bylanguage/0">By Language</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/all"
              component={() => <NowPlaying films={this.state.films} />}
            />
            <Route
              path="/byyear"
              component={() => (
                <ByYear films={this.state.films} years={this.state.years} />
              )}
            />
            <Route
              path="/bylanguage/:alpha2"
              component={(props) => (
                <ByLanguage
                  films={this.state.films}
                  languages={this.state.languages}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
