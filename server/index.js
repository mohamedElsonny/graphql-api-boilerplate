const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const context = require('./context')
const typeDefs = require('./schema')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  context,
  subscriptions: {
    path: '/'
  }
})

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})