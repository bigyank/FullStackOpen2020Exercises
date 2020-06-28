const { ApolloServer, gql, UserInputError } = require("apollo-server");
const _ = require("lodash");
require("../server/db/database");

const Author = require("../server/schemas/Author");
const Book = require("../server/schemas/Book");

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String): [Author!]!
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    addbook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Mutation: {
    addbook: async (root, args) => {
      const book = new Book(...args);
      console.log(book);
      return book.save();
    },
  },
  Book: {
    author: () => {
      return {
        name: "Default",
        id: "12312sd",
        born: 1234,
        bookCount: 1,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
