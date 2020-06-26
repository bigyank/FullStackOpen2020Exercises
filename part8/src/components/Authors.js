import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { ALL_AUTHORS } from "../queries/queries";

const Authors = (props) => {
  const [authors, setAuthors] = useState(null);
  const [getAuthors, result] = useLazyQuery(ALL_AUTHORS);

  useEffect(() => {
    getAuthors();
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (!authors) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
