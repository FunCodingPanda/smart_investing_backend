const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

const testUser = {
  name: 'Test',
  email: 'users_test@test.com',
  password: 'not-a-real-password',
  confirmPassword: 'not-a-real-password'
}

describe('Users', () => {
  describe('POST /users', () => {
    it('should be able to create a user', (done) => {
      chai.request(app)
        .post(`/users`)
        .send(testUser)
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
      chai.request(app)
        .post(`/users/name`)
        .send({...testUser, name: ''})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Name is required')
          done()
        })
    })

    it('requires names to be at least 4 characters', (done) => {
      chai.request(app)
        .post(`/users/name`)
        .send({...testUser, name: 'abc'})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Name should be at least 4 characters')
          done()
        })
      
    })

    it('should fail to create a user without an email', (done) => {
      chai.request(app)
        .post(`/users/email`)
        .send({...testUser, email: ''})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Email is required')
          done()
        })
    })

    it('requires emails to be valid', (done) => {
      // email regex: /w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/gm
      chai.request(app)
        .post(`/users/name`)
        .send({...testUser, email: 'panda@.com'})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Email is invalid')
          done()
        })
      
    })

    it('should fail to create a user without a password', (done) => {
      chai.request(app)
        .post(`/users/password`)
        .send({...testUser, password: ''})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Password is required')
          done()
        })
    })

    it('should fail to create a user if passwords do not match', (done) => {
      chai.request(app)
        .post(`/users/name`)
        .send({...testUser, password: 'abc', confirmPassword: 'abd'})
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.data).to.be.ok
          expect(res.body.data.error).to.equal('Passwords do not match')
          done()
        })
    })
  })

  describe('GET /users', () => {
    it('should fetch all users', (done) => {
      chai.request(app)
        .get(`/users`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.ok
          expect(res.body.data.users).to.be.ok
          expect(res.body.data.users.length).to.be.ok
          done()
        })
    })
  })

  describe('GET /users/:id', () => {
    it('should fetch a user', (done) => {
      chai.request(app)
        .get(`/users/1`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.ok
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.be.ok
          expect(res.body.data.email).to.be.ok

          // The response should never have passwords (security flaw)
          expect(res.body.data.password).to.not.be.ok
          expect(res.body.data.hashed_password).to.not.be.ok
          done()
        })
    })
  })

  describe('PATCH /users/:id', () => {
    it('should not allow users to be edited', (done) => {
      chai.request(app)
        .patch(`/users/1`)
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should not allow users to be deleted', (done) => {
      chai.request(app)
        .delete(`/users/1`)
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
    })
  })
})
