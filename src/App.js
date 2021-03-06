import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./styles.css";

import Home from "./Home";
import FilmPage from "./FilmPage";
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
    fetch(`${TMDB.source_api_url + TMDB.api_key}`)
      .then((response) => {
        return response.json();
      })
      .then((pages) => {
        for (let page = 1; page <= pages.total_pages; page++) {
          fetch(`${TMDB.source_api_url + TMDB.api_key}&page=${page}`)
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

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <b>
                  <Link to="/">Home</Link>
                </b>
              </li>
              <li>
                <b>
                  <Link to="/filmpage/all">All</Link>
                </b>
              </li>
              <li>
                <b>
                  <Link to={`/filmpage/${currentYear}`}>By Year</Link>
                </b>
              </li>
              <li>
                <b>
                  <Link to="/filmpage/en">By Language</Link>
                </b>
              </li>
              <li>
                <b>
                  <Link to="/filmpage/top20">Top 20</Link>
                </b>
              </li>
            </ul>
          </nav>
          <br />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              path="/filmpage/:alpha2"
              component={(routerProps) => (
                <FilmPage
                  {...routerProps}
                  films={this.state.films}
                  languages={this.state.languages}
                  years={this.state.years}
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
