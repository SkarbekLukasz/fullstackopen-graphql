import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>;
  }

  console.log(authorsQuery);

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
    </div>
  );
};

export default Authors;
