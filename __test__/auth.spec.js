process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('app', () => {
  it('returns 200 OK when request is valid', async () => {
    const response = await chai.request(server).get('/api/v1/all-posts');
    expect(response).to.have.status(200);
  });

  it('returns 200 OK when request is valid', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/post/63837ada1cc5a749e52c4f89');
    expect(response).to.have.status(200);
  });
});
