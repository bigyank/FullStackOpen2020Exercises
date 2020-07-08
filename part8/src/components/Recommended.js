import React from "react";

const Recommended = ({ show, favGenre, allBooks }) => {
  if (!show) {
    return null;
  }

  if (favGenre.loading || allBooks.loading) {
    return <p>Fetching data...</p>;
  }

  let userFavGenre;
  if (favGenre.data) {
    userFavGenre = favGenre.data.me.favoriteGenre;
  }
  console.log(userFavGenre);

  const books = allBooks.data.allBooks;
  const favBooks = books.filter((book) => book.genres.includes(userFavGenre));

  return (
    <div>
      <h2>books</h2>
      <h3>According to your favourite genre</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
