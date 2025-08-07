import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";
import { useState } from "react";
import Select from "react-select";

const Authors = () => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const authorOptions = authors.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const submit = async (event) => {
    event.preventDefault();

    editBorn({
      variables: { name: selectedOption.value, born: parseInt(born) },
    });

    // setSelectedOption(null);
    setBorn("");
  };

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
      <h2>Set birthyear</h2>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={authorOptions}
      />
      <form onSubmit={submit}>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
