import React from "react";
import { useQuery } from "@apollo/client";
import BookList from "./BookList";
import { ME, ALL_BOOKS } from "../queries/queries";

const Recommended = ({ show }) => {
  const allBooks = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  if (!show || !allBooks.data || !meResult.data) {
    return null;
  }

  console.log("local storage =>", localStorage);

  console.log("user =>", meResult.data);

  const userFavGenre = meResult.data.me.favoriteGenre;

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
