import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries/queries";

const Authors = ({ show, notify }) => {
  const allAuthors = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (allAuthors.loading) {
    return <p>Loading...</p>;
  }

  const authors = allAuthors.data.allAuthors;

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
            <tr key={a.id}>
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
