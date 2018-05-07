const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Users', () => {
  describe('POST /users', () => {
    it('should be able to create a user', (done) => {
      const user = {
        name: 'Test',
        email: 'users_test@test.com',
        password: 'not-a-real-password',
        confirmPassword: 'not-a-real-password'
      }
      chai.request(app)
        .post(`/users`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.ok
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.equal(user.name)
          expect(res.body.data.email).to.equal(user.email)

          // Default cash value is $20,000.00
          expect(res.body.data.cash).to.equal(20000.00)

          // The response should never have passwords (security flaw)
          expect(res.body.data.password).to.not.be.ok
          expect(res.body.data.hashed_password).to.not.be.ok
          done()
        })
    })

    it('should fail to create a user without a name', (done) => {
      
    })

    it('requires names to be at least 4 characters', (done) => {
      
    })

    it('should fail to create a user without an email', (done) => {
      
    })

    it('requires emails to be valid', (done) => {
      
    })

    it('should fail to create a user without a password', (done) => {
      
    })

    it('should fail to create a user if passwords do not match', (done) => {
      
    })
  })

  describe('GET /users', () => {
  
  })

  describe('GET /users/:id', () => {
    
  })

  describe('PATCH /users/:id', () => {
    
  })

  describe('DELETE /users/:id', () => {

  })
})
