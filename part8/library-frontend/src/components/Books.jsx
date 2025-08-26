import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

import { useState } from "react";

const padding = {
  padding: 5,
};

const Books = () => {
  const [genre, setGenre] = useState(null);
  const [getGenreBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);

  const result = useQuery(ALL_BOOKS);

  if (loading) return <p>loading</p>;
  if (error) return <p>error: {error}</p>;

  if (result.loading) {
    return <div style={padding}>loading...</div>;
  }

  const books = result.data.allBooks;
  const flatGenresArr = result.data.allBooks.flatMap((book) => book.genres);
  const genresUnique = flatGenresArr.reduce((acc, value) => {
    if (!acc.includes(value)) {
      acc.push(value);
    }
    return acc;
  }, []);

  let bookList = null;

  if (genre && data) {
    bookList = data.allBooks;
  } else {
    bookList = books;
  }

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
      {genresUnique.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre);
            getGenreBooks({ variables: { genre: genre } });
          }}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
