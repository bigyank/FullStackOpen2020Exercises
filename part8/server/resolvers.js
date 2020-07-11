const { UserInputError, AuthenticationError } = require("apollo-server");
const DataLoader = require("dataloader");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const JWT_SECRET = "SECRET";

const Author = require("./schemas/Author");
const Book = require("./schemas/Book");
const User = require("./schemas/User");

// dataloaders to count book number
const bookCountLoader = new DataLoader((keys) => getBookCount(keys));

const getBookCount = async (ids) => {
  const books = await Book.find({ author: { $in: ids } });
  const groupById = _.groupBy(books, (book) => book.author);
  return _.map(ids, (id) => groupById[id]);
};

const findOrCreateAuthor = async (name) => {
  const author = await Author.findOne({ name });
  if (!author) {
    return await new Author({ name }).save();
  }
  return author;
};

module.exports = {
  Query: {
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author) {
        const bookAuthor = await Author.findOne({ name: author });
        query.author = bookAuthor.id;
      }
      if (genre) {
        query.genres = { $in: [genre] };
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      return await Author.find({}).populate("author");
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser,
  },

  Mutation: {
    addBook: async (
      root,
      { title, author, published, genres },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authorized");
      }
      const book = new Book({ title, published, genres });
      try {
        book.author = await findOrCreateAuthor(author);
        return await book
          .save()
          .then((book) => book.populate("author").execPopulate());
      } catch (error) {
        throw new UserInputError(error.message, { error });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not Authorized");
      }
      let author = await Author.findOne({ name: args.name });
      console.log(author);

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

  Author: {
    bookCount: async (root) => {
      const books = await bookCountLoader.load(root.id);
      return books.length;
    },
  },
};
