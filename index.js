import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

const PORT = 4000;

const resolvers = {
  Query: {
    games: () => db.games,
    game: (_, args) => db.games.find((game) => game.id === args.id),
    reviews: () => db.reviews,
    // parent(_ here: parent resolver in the resolver chain)
    // args => arguments
    // context => object that represents context object with data like auth, etc
    review: (_, args) => db.reviews.find((review) => review.id === args.id),
    authors: () => db.authors,
    author: (_, args) => db.authors.find((author) => author.id === args.id),
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready on port ${PORT}...`);
