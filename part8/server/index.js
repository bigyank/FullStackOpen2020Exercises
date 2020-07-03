const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");

require("../server/db/database");

const JWT_SECRET = "SECRET";
const Author = require("./schemas/Author");
const Book = require("./schemas/Book");
const User = require("./schemas/User");

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authorized");
      }

      const author = await Author.findOne({ name: args.author });

      try {
        if (!author) {
          const newAuthor = await new Author({ name: args.author }).save();
          return await new Book({ ...args, author: newAuthor._id }).save();
        }
        return await new Book({ ...args, author: author._id }).save();
      } catch (error) {
        throw new UserInputError(error.message, { error });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authorized");
      }
      let author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError("Invalid Author");
      }
      author.born = args.born;
      return author.save();
    },

    createUser: async (root, args) => {
      try {
        return await new User(args).save();
      } catch (error) {
        throw new UserInputError(error.message, { error });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("Invalid Credentials");
      }
      return {
        value: jwt.sign({ username: user.username, id: user._id }, JWT_SECRET),
      };
    },
  },

  Book: {
    author: (root) => Author.findById(root.author),
  },

  Author: {
    bookCount: async (root) => {
      const booksofAuthor = await Book.find({ author: root._id });
      return booksofAuthor.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
