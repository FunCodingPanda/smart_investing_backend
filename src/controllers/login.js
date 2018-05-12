const users = require('../models/users')
const { jwtSignAsync } = require('../utils/jsonwebTokenAsync')

const { TOKEN_SECRET } = process.env;

loginUser = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if(!email || !password) {
    return res.status(401).json({
      error: 'Email and password are required.'
    })
  }

  users.getByEmail(email)
    .then((user, error) => {
      if (error) {
        res.status(403).json({
          error: 'User does not exist.'
        })
      } else {
        users.tryLogin(email, password).then(success => {
          if (success) {
            const payload = {
              loggedIn: true,
              sub: {
                id: user.id
              },
              exp: (Date.now() / 1000) + (60 * 60 * 24 * 30) // now + 30 days
            }
            jwtSignAsync(payload, TOKEN_SECRET).then(token => {
              res.status(200).json({
                auth: {
                  access_token: token,
                  expires_in: payload.exp,
                  token_type: 'Bearer'
                },
                user: {
                  ...user,
                  password: undefined,
                  hashed_password: undefined
                }
              })
            })
          } else {
            res.status(403).json({
              errors: {
                password: 'Password was incorrect'
              }
            })
          }
        })
      }
    })
}

module.exports = {
  loginUser
}
