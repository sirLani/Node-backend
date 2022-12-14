process.env.NODE_ENV = 'test';
const nock = require('nock');
// const request = require('supertest')('http://localhost:8000');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

const mockApi = nock('http://localhost:8000');
describe('app', () => {
  it('returns 200 OK when all posts request is valid', async () => {
    const resObj = [
      {
        image: {
          url: 'https://res.cloudinary.com/dagzxzuv0/image/upload/v1669923721/pspcw5cadtv3qikabcjw.png',
          public_id: 'pspcw5cadtv3qikabcjw',
        },
        _id: '6389038c959b2c55ba8feedf',
        content: 'Testing the microphone',
        postedBy: {
          image: [Object],
          _id: '638658558d26ccffc6117ba7',
          name: 'Master ugwe tai',
        },
        likes: [],
        comments: [],
        createdAt: '2022-12-01T19:42:04.692Z',
        updatedAt: '2022-12-01T19:42:04.692Z',
        __v: 0,
      },

      {
        image: {
          url: 'https://res.cloudinary.com/dagzxzuv0/image/upload/v1669579586/sk0ojyr6wnuhzcogmvnj.jpg',
          public_id: 'sk0ojyr6wnuhzcogmvnj',
        },
        _id: '6383c345c962609c7fad7273',
        content:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit quis, hac imperdiet elementum dis risus odio tortor ut, laoreet et leo integer a curae viverra. Dropped Update',
        postedBy: {
          image: [Object],
          _id: '637d40864fff7eae9de92961',
          name: 'user',
        },
        likes: [],
        comments: [],
        createdAt: '2022-11-27T20:06:29.678Z',
        updatedAt: '2022-11-27T23:21:58.962Z',
        __v: 0,
      },
    ];

    mockApi.get('/api/v1/all-posts').reply(200, resObj);

    const response = await chai.request(server).get('/api/v1/all-posts');
    // console.error('active mocks: %j', mockApi.activeMocks());
    // console.log(response.body);
    expect(response.body).to.have.an('array');
    expect(response).to.have.status(200);
  });

  it('returns 200 OK when individual post request is valid', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/post/63837ada1cc5a749e52c4f89');
    expect(response).to.have.status(200);
  });

  it('returns 200 OK when search user is valid request is valid', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/search-user/63837ada1cc5a749e52c4f89');
    expect(response).to.have.status(200);
  });

  it('returns 200 OK when search user is valid request is valid', async () => {
    const response = await chai.request(server).get('/api/v1/user/user1');

    expect(response).to.have.status(200);
  });
});
