import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../graphql/queries";
import Select from "react-select";

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  if (!props.show) {
    return null;
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>;
  }

  const edit = async (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    });
    setBorn("");
    setName("");
  };

  const authorNames = () => {
    return authorsQuery.data.allAuthors.map((author) => {
      return { value: author.name, label: author.name };
    });
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
          {authorsQuery.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={edit}>
        name{" "}
        <Select
          onChange={({ value }) => setName(value)}
          options={authorNames()}
        />
        <p>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </p>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
