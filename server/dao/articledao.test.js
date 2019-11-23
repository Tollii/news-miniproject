// @flow

const mysql = require('mysql');
const runsqlfile = require('./runsqlfile');
const ArticleDao = require('./articledao.js');
const pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let articleDao = new ArticleDao(pool);

beforeAll( done => {
   runsqlfile('dao/create_tables.sql', pool, () => {
       runsqlfile('dao/create_testdata.sql', pool, done);
       console.log("Test setup complete");
    });
});

afterAll( () => {
   pool.end();
});

/*
test('get one article from db', done => {
   function callback(status, data) {
       console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
       expect(data.length).toBe(1);
       expect(data[0].title).toBe('Guards Protect Fitchburg Plants From Sabotage');
       done();
   }
   articleDao.getOne(0, callback);
});
*/

test('get all articles from db', done => {
    function callback(status, data) {
        console.log("Test: get all articles from db");
        console.log('Test callback: status=' + status + ', data=' + data.length);
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    };
    articleDao.getAll(callback);
});