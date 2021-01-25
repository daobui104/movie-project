import React from "react";

function FilmCast(props) {
  const url = "https://image.tmdb.org/t/p/w780/" + props.cast.profile_path;
  return (
    <tr className="odd">
      <td className="primary_photo">
        <img alt="" height="57" width="41" src={url} />
      </td>
      <td>{props.cast.original_name}</td>
      <td className="ellipsis"> ... </td>
      <td className="character">{props.cast.character}</td>
    </tr>
  );
}

export default FilmCast;
