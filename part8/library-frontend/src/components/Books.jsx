import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const flatGenresArr = result.data.allBooks.flatMap((book) => book.genres);
  const genresUnique = flatGenresArr.reduce((acc, value) => {
    if (!acc.includes(value)) {
      acc.push(value);
    }
    return acc;
  }, []);

  let bookList = books;

  if (genre) {
    bookList = books.filter((book) => book.genres.includes(genre));
  }

  const handleGenreFilter = (g) => {
    setGenre(g);
  };

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresUnique.map((g) => (
        <button key={g} onClick={() => handleGenreFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
