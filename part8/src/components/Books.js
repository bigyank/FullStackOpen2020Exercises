import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import BookList from "./BookList";
import { ALL_BOOKS } from "../queries/queries";

const GenreBtn = ({ genres, setFilter }) => {
  return (
    <div>
      {genres.map((genre) => {
        return (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        );
      })}
      <button onClick={() => setFilter("all")}>all</button>
    </div>
  );
};

const Books = ({ show }) => {
  const allBooks = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState("all");

  const getGenres = () => {
    let allGenre = [];

    // extracting all genres
    books.map((book) => {
      const genre = book.genres.map((genre) => genre);
      return (allGenre = [...allGenre, ...genre]);
    });

    // removing dublicate genre
    // returning set as array to use higher order functions on it
    return [...new Set(allGenre)];
  };

  if (!show) {
    return null;
  }

  if (allBooks.loading) {
    return <p>Loading...</p>;
  }

  let books = allBooks.data.allBooks;
  const genreSet = getGenres(books);

  // return books according to selected genre
  if (filter !== "all") {
    books = books.filter((book) => book.genres.includes(filter));
  }

  return (
    <div>
      <BookList books={books} />
      <GenreBtn genres={genreSet} setFilter={setFilter} />
    </div>
  );
};

export default Books;
