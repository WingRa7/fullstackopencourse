import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

import { useEffect, useState } from "react";

const padding = {
  padding: 5,
};

const Recommend = () => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS);
  const resultUser = useQuery(ME);

  console.log(result.data);

  useEffect(() => {
    if (resultUser.data) setGenre(resultUser.data.me.favoriteGenre);
  }, [resultUser.data]);

  if (result.loading || resultUser.loading) {
    return <div style={padding}>loading...</div>;
  }

  const books = result.data.allBooks;
  let bookList = books;

  if (genre) {
    bookList = books.filter((book) => book.genres.includes(genre));
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
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
    </div>
  );
};

export default Recommend;
