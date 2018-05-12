const users = require('../models/users')
const { jwtSignAsync } = require('../utils/jsonwebTokenAsync')
const { TOKEN_SECRET } = process.env;

create = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: 'Name is required'})
  } else if (req.body.name.length < 4) {
    return res.status(400).json({error: 'Name should be at least 4 characters'})
  } else if (!req.body.email) {
    return res.status(400).json({error: 'Email is required'})
  } else if (!req.body.email.match(/\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/gm)) {
    return res.status(400).json({error: 'Email is invalid'})
  } else if (!req.body.password) {
    return res.status(400).json({error: 'Password is required'})
  } else if (req.body.password != req.body.confirmPassword) {
    return res.status(400).json({error: 'Passwords do not match'})
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cash: 20000.00
  }

  users.create(user)
    .then((insertedUser, error) => {
      if (error) {
        res.status(500).json({
          error: 'Failed to create user'
        })
      } else {
        const payload = {
          loggedIn: true,
          sub: { id: user.id },
          exp: (Date.now() / 1000) + (60 * 60 * 24 * 30) // now + 30 days
        };
        jwtSignAsync(payload, TOKEN_SECRET).then(token => {
          res.status(201).json({
            auth: {
              access_token: token,
              expires_in: payload.exp,
              token_type: 'Bearer'
            },
            user: {
              ...insertedUser,
              password: undefined,
              hashed_password: undefined
            }
          })
        })
      }
    })
}

getAll = (req, res, next) => {
  users.getAll().then((users, error) => {
    if (error) {
      res.status(500).json({
        error: 'Failed to get users'
      })
    } else {
      res.status(200).json({
        users
      })
    }
  })
}

getById = (req, res, next) => {
  users.getById(req.params.id).then((user, error) => {
    if (error) {
      res.status(404).json({
        error: 'User not found'
      })
    } else {
      res.status(200).json({...user, password: undefined, hashed_password: undefined})
    }
  })
}

module.exports = {
  create,
  getAll,
  getById
}
