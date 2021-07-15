const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../index');

describe('Unit testing the / route', function() {

    // tests the home route 
    it('should return OK status', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    // tests the response after calling the home route, checks for information related to adele
    it('should contain message with information related to Adele on it', function() {
        return request(app)
          .get('/')
          .then(function(response){
              expect(response.text).to.contain('Adele');
          })
      });

    //   checks the route that contains an artist as a parameter
    it('should return OK status', function() {
        return request(app)
          .get('/api/albums/:artist')
          .then(function(response){
              assert.equal(response.status, 200)
          })
      });
});