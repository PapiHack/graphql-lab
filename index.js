import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema'

const PORT = 4000

// server setup
const server = new ApolloServer({
    typeDefs,
    // resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server ready on port ${PORT}...`)
