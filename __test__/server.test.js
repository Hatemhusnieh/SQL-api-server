'use strict';
const supergoose = require('@code-fellows/supergoose');
const {app} = require('../src/server');
const mockReq = supergoose(app);

describe('API server', () => {
  it('right path', async () => {
    const response = await mockReq.get('/');
    expect(response.status).toEqual(200);
  });
  it('bad path', async () => {
    const res = await mockReq.get('/yoo');
    expect(res.status).toEqual(404);
  });
});

describe('CRUD / games route', () => {
  let id;
  it('POST', async ()=> {
    let data = {name: 'game1', rate: 0, genre: 'action'};
    const res = await mockReq.post('/api/v1/games').send(data);
    id = res.body.id;
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(data.name);
  });

  it('GET all', async () => {
    let data = {name: 'game2', rate: 0, genre: 'action'};
    const res1 = await mockReq.post('/api/v1/games').send(data);
    const res = await  mockReq.get('/api/v1/games');
    expect(res.status).toEqual(200);
    console.log(res.body);
    expect(res.body.games.length).toEqual(2);
  });

  it('GET one', async () => {
    let data = {name: 'game1', rate: 0, genre: 'action'};
    const res = await mockReq.get('/api/v1/games/'+id);
    expect(res.status).toEqual(200);
    expect(res.body.games[0].name).toEqual(data.name);
  });

  it('PUT: updates', async () => {
    let data = {name: 'game5', rate: 0, genre: 'horror'};
    const res = await mockReq.put(`/api/v1/games/${id}`).send(data);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(data.name);
  });

  it('DELETE', async () => {
    const res = await mockReq.delete(`/api/v1/games/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual[0];
  });
});
/////////////////////////////////////////////////////////
describe('CRUD / players route', () => {
  let id;
  it('POST', async ()=> {
    let data = {name: 'hatem', games: 'game1'};
    const res = await mockReq.post('/api/v1/players').send(data);
    id = res.body.id;
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(data.name);
  });

  it('GET all', async () => {
    let data = {name: 'osama', games: 'game2'};
    const res1 = await mockReq.post('/api/v1/players').send(data);
    const res = await  mockReq.get('/api/v1/players');
    expect(res.status).toEqual(200);
    expect(res.body.players.length).toEqual(2);
  });

  it('GET one', async () => {
    let data = {name: 'hatem', games: 'game1'};
    const res = await mockReq.get('/api/v1/players/'+id);
    expect(res.status).toEqual(200);
    expect(res.body.players[0].name).toEqual(data.name);
  });

  it('PUT: updates', async () => {
    let data = {name: 'toto', games: 'game1'};
    const res = await mockReq.put(`/api/v1/players/${id}`).send(data);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(data.name);
  });

  it('DELETE', async () => {
    const res = await mockReq.delete(`/api/v1/players/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual[0];
  });
});