DROP TABLE IF EXISTS article;

CREATE TABLE article (
    article_id INT NOT NULL UNSIGNED AUTO_INCREMENT,
    category_id INT NOT NULL,
    title VARCHAR(100),
    summary VARCHAR(150),
    article_text MEDIUMTEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(200),
    category VARCHAR(20),
    priority TINYINT,

    PRIMARY KEY (article_id),
);



INSERT INTO article (title, summary, article_text, image, priority) VALUES ('Guards Protect Fitchburg Plants From Sabotage', 'Local man saves the day','As a result of the declaration of war against the United States made today by Japan, and the impending declaration against that country by Congress in Washington tomorrow, heavy guards have been thrown around all local manufacturing plants handling government defense orders. Two members of the ARP voluntary police force, and one regular policeman have managed to stop a sabotage on the local rifle factory', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Armory_mechanical_presses_in_the_mid-20th_century%2C_Springfield_Armory.jpg', 1);

INSERT INTO article (title, summary, article_text, image, priority) VALUES ('JAPS DECLARE WAR ON U.S; BOMB PEARL HARBOR BASE; 350 AMERICANS ARE KILLED', 'Early this morning, Japanese bombers escorted by figthers has attacked the military base of Pearl Harbor', 'Reports from Hawaii indicated that Honolulu had no warning of the attack, Japanese bombers, with the red circle of the Rising Sun of Japan on their wings, suddenly appeared, escorting by fighters. Flying high, they suddenly dive-bombed, attacking Pearl Harbor, the great Navy base, the Army’s Hickam Field and Ford Island. At least one torpedo plane was seen to launch a torpedo at warships in Pearl Harbor.', 'https://static01.nyt.com/images/2011/12/05/learning/Dec07LN/Dec07LN-blog480.jpg' , 2);
