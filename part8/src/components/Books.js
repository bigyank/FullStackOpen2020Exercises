import React from "react";

const GenreBtn = ({ genre }) => {
  return <button>{genre}</button>;
};

const Books = ({ show, allBooks }) => {
  if (!show) {
    return null;
  }

  if (allBooks.loading) {
    return <p>Loading...</p>;
  }
  const books = allBooks.data.allBooks;
  console.log(books);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.map((book) => {
        return book.genres.map((genre) => <GenreBtn genre={genre} />);
      })}
    </div>
  );
};

export default Books;
