DROP TABLE IF EXISTS article;

CREATE TABLE article (
     article_id INT NOT NULL UNSIGNED AUTO_INCREMENT,
     category_id INT NOT NULL,
     title VARCHAR(100),
     summary VARCHAR(150),
     article_text MEDIUMTEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     image VARCHAR(200),
     priority TINYINT,
     PRIMARY KEY (article_id)

) ENGINE=InnoDB Default Charset=latin1;