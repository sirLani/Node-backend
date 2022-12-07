process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

// const SECONDS = 1000;
// jest.setTimeout(30 * SECONDS);

describe('app', () => {
  it('returns 200 OK when request is valid', async () => {
    const response = await chai.request(server).get('/api/v1/posts');
    console.log(response.body);
    expect(response).to.have.status(200);
  });
});
