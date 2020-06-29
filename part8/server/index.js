const { ApolloServer, gql, UserInputError } = require("apollo-server");
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
    addBook(
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
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = await new Author({ name: args.author }).save();
        return await new Book({ ...args, author: newAuthor._id }).save();
      }
      return await new Book({ ...args, author: author._id }).save();
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      author.born = args.born;
      return author.save();
    },
  },
  Book: {
    author: (root) => Author.findById(root.author),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
