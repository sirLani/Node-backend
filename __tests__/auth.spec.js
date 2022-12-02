const request = require('supertest');
const server = require('../server');

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('app', () => {
  it('returns 200 OK when signup request is valid', async (done) => {
    request(server)
      .post('/api/v1/register')
      .send({
        username: 'user',
        email: 'user@mail.com',
        password: 'password',
        secret: 'red',
        name: 'user',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });
});
