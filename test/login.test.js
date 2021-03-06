//
// Tests based on https://github.com/gSchool/auth-unit-assessment tests
//
const request = require('supertest');
const { jwtVerifyAsync } = require('../src/utils/jsonwebTokenAsync');
const { expect } = require('chai');

const app = require('../');

describe('Login routes', () => {

  describe('POST /login', () => {

    it('should return 401 when not given an email or password', () => {
      return request(app)
        .post('/login')
        .expect(401);
    });

    it('should return 401 when not given an email', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ password: 'rowan' })
        .expect(401);
    });

    it('should return 401 when not given a password', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: 'test@test.com' })
        .expect(401);
    });

    it('should return 403 when given a non existent email', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: 'NonExistentUser@gmail.com', password: 'passwordfornonexistentuser' })
        .expect(403);
    });

    it('should return 403 when given an invalid password', async () => {
      const response = await request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: 'Rowan@gmail.com', password: 'thewrongpassword' })
        .expect(403);

      expect(response.body).to.be.ok
      expect(response.body.errors).to.be.ok
      expect(response.body.errors.password).to.equal('Password was incorrect')
    });

    it('should respond with an access token when given a valid email and password', async () => {

      // return request(app)
      const response = await request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: 'test@test.com', password: 'bacon' })
        .expect(200);

      const parseTokenFrom = (response) => {
        try {
          return response.body.auth.access_token;
        } catch(err) {
          console.log('in catch')
        }
      }

      const token = parseTokenFrom(response);
      expect(token).to.exist;

      try {
        const tokenPayload = await jwtVerifyAsync(token, process.env.TOKEN_SECRET);
        expect(tokenPayload).to.exist;

        expect(tokenPayload.sub.id).to.exist;
        expect(tokenPayload.sub.id).to.equal(1);

        expect(tokenPayload.loggedIn).to.exist;
        expect(tokenPayload.loggedIn).to.be.true;

        expect(tokenPayload.exp).to.exist;
        expect(tokenPayload.exp).to.be.a('number');
        expect(tokenPayload.exp).to.be.greaterThan(Date.now() / 1000);
      } catch(err) {
        throw(err);
      }
    });
  });
});
