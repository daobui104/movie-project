import React from "react";
import { Link } from "react-router-dom";

export default function FilterMenu(props) {
  let menu = null;

  if (!isNaN(props.alpha2)) {
    menu = (
      <nav>
        <h1>Now Playing - By Year</h1>

        <ul className="ul-filter">
          {props.years.map((year) => {
            return (
              <li
                class={`${
                  year.toString() === props.alpha2.toString() ? "active" : ""
                }`}
              >
                <Link to={`/filmpage/${year}`}>{` ${year}`}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  } else if (props.alpha2 !== "all" && props.alpha2 !== "top20") {
    menu = (
      <nav>
        <h1>Now Playing - By Language</h1>

        <ul className="ul-filter">
          {props.languages.map((language) => {
            return (
              <li class={`${language === props.alpha2 ? "active" : ""}`}>
                <Link to={`/filmpage/${language}`}>
                  {`${props.getEnglishCode(language)}`}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return <div>{menu}</div>;
}
