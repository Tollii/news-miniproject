// @flow

module.exports = class Dao {
  constructor(pool: mysql.Pool) {
    this.pool = pool;
  }

  query(sql, params, callback) {
    this.pool.getConnection((err, connection) => {
      console.log("dao: connected to database");
      if (err) {
        console.log("dao: error connecting");
        callback(500, { error: "error with connection" });
      } else {
        console.log("dao: running sql: " + sql);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback(500, { error: "error querying" });
          } else {
            console.log("dao: returning rows");
            callback(200, rows);
          }
        });
      }
    });
  }
};
