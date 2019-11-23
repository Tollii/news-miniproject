// @flow

const mysql = require('mysql');
const runsqlfile = require('./runsqlfile');
const ArticleDao = require('./articledao.js');
const pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'supertestdb',
  debug: false,
  multipleStatements: true
});

let articleDao = new ArticleDao(pool);

beforeAll(done => {
  runsqlfile('dao/create_tables.sql', pool, () => {
    runsqlfile('dao/create_testdata.sql', pool, done);
    console.log('Test setup complete');
  });
});

afterAll(() => {
  pool.end();
});

test('get all articles from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + data.length);
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }
  articleDao.getAll(callback);
});

test('get one article from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].title).toBe('Guards Protect Fitchburg Plants From Sabotage');
    done();
  }
  articleDao.getOne(1, callback);
});

test('add one article from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(status).toBe(200);
    done();
  }
  articleDao.createOne(
    {
      title: 'yeet',
      summary: 'yeet or get yeeted',
      article_text: 'yote',
      priority: 1,
      category: 'Other',
      image: 'Internett.com'
    },
    callback
  );
});

test('delete article from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(status).toBe(200);
    done();
  }
  articleDao.deleteOne(1, callback);
});

/*
test('update article db', done => {
  function callback1(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + JSON.stringify(data));
    expect(status).toBe(200);
    done();
  }
  function callback2(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + JSON.stringify(data));
    expect(data[0].title).toBe('yote');
    done();
  }

  articleDao.updateOne(
    {
      title: 'yote',
      summary: 'yeet or get yeeted',
      article_text: 'yote',
      priority: 1,
      category: 'Other',
      image: 'Internett.com'
    },
    1,
    callback1
  );
  articleDao.getOne(1, callback2);
});
*/
