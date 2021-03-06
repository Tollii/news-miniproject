DROP TABLE IF EXISTS article;

CREATE TABLE article (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(100),
    summary VARCHAR(150),
    article_text MEDIUMTEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(200),
    category VARCHAR(20),
    priority TINYINT
);