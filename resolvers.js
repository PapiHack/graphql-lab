import db from "./db.js";

export const resolvers = {
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
  Game: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.game_id === parent.id),
  },
  Author: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.author_id === parent.id),
  },
  Review: {
    author: (parent) =>
      db.authors.find((author) => author.id === parent.author_id),
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
  },
  Mutation: {
    deleteGame: (_, args) => {
      db.games = [...db.games.filter((game) => game.id !== args.id)];
      return db.games;
    },
    addGame: (_, args) => {
      const gameId = db.games.length + 1;
      let game = {
        ...args.game,
        id: gameId,
      };
      db.games.push(game);
      return game;
    },
    updateGame: (_, args) => {
      db.games = [
        ...db.games.map((game) => {
          if (game.id === args.id) {
            return {
              ...game,
              ...args.edit,
            };
          }
          return game;
        }),
      ];
      return db.games.find((game) => game.id === args.id);
    },
  },
};
