const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let authorDocument = null;

      if (args.author) {
        authorDocument = await Author.findOne({ name: args.author });

        if (!authorDocument) {
          throw new GraphQLError("Matching author not found in database", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              error,
            },
          });
        }
      }

      const bookQuery = {};

      if (args.author) {
        bookQuery.author = authorDocument._id;
      }
      if (args.genre) {
        bookQuery.genres = args.genre;
      }

      const books = await Book.find(bookQuery).populate("author");

      return books;
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.countDocuments({ author: root._id });
      return booksByAuthor;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const result = await Author.findOne({ name: args.author });
      if (!result) {
        const newAuthor = new Author({ name: args.author, born: null });
        await newAuthor.save().catch((error) => {
          throw new GraphQLError("Creating new book author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        });
        const book = new Book({ ...args, author: newAuthor._id });
        const savedBook = await book.save().catch((error) => {
          throw new GraphQLError("Creating new book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        });
        const populatedBook = await savedBook.populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      } else {
        const book = new Book({ ...args, author: result._id });
        const savedBook = await book.save().catch((error) => {
          throw new GraphQLError("Creating new book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        });

        const populatedBook = await savedBook.populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const authorUpdate = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { returnDocument: "after", runValidators: true }
      ).catch((error) => {
        throw new GraphQLError("Updating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });

      return authorUpdate;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
