import React from "react";
import { Link } from "react-router-dom";

export default function FilterMenu(props) {
  let menu = null;

  if (!isNaN(props.alpha2)) {
    menu = (
      <nav>
        <h1>By Year</h1>
        <p>
          {props.years.map((year) => {
            return year.toString() === props.alpha2.toString() ? (
              " " + year + " | "
            ) : (
              <Link to={`/filmpage/${year}`}>{` ${year} |`}</Link>
            );
          })}
        </p>
      </nav>
    );
  } else if (props.alpha2 !== "all" && props.alpha2 !== "top20") {
    menu = (
      <nav>
        <h1>By Language</h1>
        <p>
          {props.languages.map((language) => {
            return language === props.alpha2 ? (
              " " + props.getEnglishCode(language) + " | "
            ) : (
              <Link to={`/filmpage/${language}`}>
                {` ${props.getEnglishCode(language)} |`}
              </Link>
            );
          })}
        </p>
      </nav>
    );
  }

  return <div>{menu}</div>;
}
