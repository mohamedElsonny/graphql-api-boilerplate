const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    signup: async (
      _,
      { data: { name, email, password } },
      { prisma },
      info
    ) => {
      try {
        const existUser = await prisma.query.users({
          where: {
            email
          }
        })
        if (existUser && existUser.length) {
          return new Error('email already exists')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await prisma.mutation.createUser(
          {
            data: {
              name,
              email,
              password: hash
            }
          },
          `{
          id
          name
          email
        }`
        )

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET,
          { expiresIn: '1h' }
        )
        return { token }
      } catch (ex) {
        console.error(ex)
      }
    }
  }
}
