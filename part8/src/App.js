import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
    }
  }
`;

const Authors = ({ authors }) => {
  const FIND_AUTHOR = gql`
    query findAuthorByName($authorToSearch: String!) {
      allAuthors(name: $authorToSearch) {
        name
        born
      }
    }
  `;

  const [getPerson, result] = useLazyQuery(FIND_AUTHOR);
  const [person, setPerson] = useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { authorToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.allAuthors[0]);
    }
  }, [result]);

  if (person) {
    console.log(person);

    return (
      <div>
        <h2>{person.name}</h2>
        <p>Born:{person.born}</p>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }
  return (
    <div>
      <h2>Authors</h2>
      {authors.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

function App() {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <p>Loading...</p>;
  }

  return <Authors authors={result.data.allAuthors} />;
}

export default App;
