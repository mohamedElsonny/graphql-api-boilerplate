const path = require('path')
const { Prisma } = require('prisma-binding')

const prisma = new Prisma({
  typeDefs: path.resolve(__dirname, '../generated/prisma.graphql'),
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: false
})

module.exports= {
  prisma
}