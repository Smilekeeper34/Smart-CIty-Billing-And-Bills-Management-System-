const chai = require('chai');
const request = require('supertest');
const app = require('../app.js'); 

const { expect } = chai;

describe('Authentication API', () => {
  let token; // Variable to store the authentication token

  // Registration test
  it('should register a new user', (done) => {
    const userData = {
      email: 'test21@gmail.com',
      contactNumber: '800-900-990',
      password: 'test34',
      firstName: 'test',
      lastName: 'testdata',
    };

    request(app)
      .post('/auth/register') 
      .send(userData)
      .expect(201) // Ensure that 201 is the correct status code
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.success).to.equal(true);
        expect(res.body.token).to.be.a('string');
        token = res.body.token; // Save the token for later use
        done();
      });
  });

  // Login test
  it('should login with the registered user', (done) => {
    const loginData = {
      email: 'test2@gmail.com',
      password: 'test34',
    };

    request(app)
      .post('/auth/login') 
      .send(loginData)
      .expect(200) // Ensure that 200 is the correct status code
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.success).to.equal(true);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  // Additional tests can be added as needed
});
