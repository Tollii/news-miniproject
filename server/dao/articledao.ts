const Dao = require("./dao.js");
module.exports = class ArticleDao extends Dao {
  getOne(id, callback) {
    super.query(
      "SELECT article_id, title, summary, article_text, created_at, image, priority FROM article WHERE article_id = ?;",
      [id],
      callback
    );
  }

  getAll(callback) {
    super.query(
      "SELECT article_id, summary, title, article_text, created_at, image, priority FROM article;",
      [],
      callback
    );
  }

  createOne(json, callback) {
    const val = [
      json.title,
      json.summary,
      json.article_text,
      json.image,
      json.priority
    ];
    super.query(
      "INSERT INTO article (title, summary, article_text, image, priority) VALUES (?,?,?,?,?);",
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("DELETE FROM article WHERE article_id = ?", [id], callback);
  }

  updateOne(json, id, callback) {
    const val = [
      json.title,
      json.summary,
      json.article_text,
      json.image,
      json.priority,
      id
    ];
    super.query(
      "UPDATE article SET title = ?, summary = ?, article_text = ?, image = ?, priority = ? WHERE article_id = ?;",
      val,
      callback
    );
  }
};
