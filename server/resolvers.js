module.exports = {
  Query: {
    user: (_, { id }, { prisma }, info) => {
      return prisma.query.user(
        {
          where: {
            id
          }
        },
        info
      )
    }
  },
  Mutation: {
    createUser: (_, { name, email, password }, { prisma }, info) => {
      return prisma.mutation.createUser(
        {
          data: {
            name,
            email,
            password
          }
        },
        info
      )
    }
  }
}
