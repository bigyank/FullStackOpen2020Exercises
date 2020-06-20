import React from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
    }
  }
`;

function App() {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <p>Loading...</p>;
  }
  return <div>{result.data.allAuthors.map((p) => p.name).join(", ")}</div>;
}

export default App;
