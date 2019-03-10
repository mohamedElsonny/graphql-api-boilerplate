const path = require('path')
const { importSchema } = require('graphql-import')

const prismaSchema = importSchema(
  path.resolve(__dirname, '../../generated/prisma.graphql')
)

const schemas = {
  prismaSchema
}

const typeDefs = importSchema(
  path.resolve(__dirname, 'schema.graphql'),
  schemas
)

module.exports = typeDefs