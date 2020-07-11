import React from "react";
import { useQuery } from "@apollo/client";
import BookList from "./BookList";
import { ALL_BOOKS } from "../queries/queries";

const Recommended = ({ show, userFav }) => {
  const allBooks = useQuery(ALL_BOOKS);

  if (!show || !allBooks.data || !userFav) {
    return null;
  }

  const userFavGenre = userFav;

  const books = allBooks.data.allBooks;
  const recommendedBooks = books.filter((book) =>
    book.genres.includes(userFavGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{userFavGenre}</strong>
      </div>

      <BookList books={recommendedBooks} />
    </div>
  );
};

export default Recommended;
