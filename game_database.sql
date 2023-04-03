-- CREATE DATABASE WITH SQLITE BY "sqlite3 (name of database)"
-- run this to create the tables
-- you can then connect and execute queries

CREATE TABLE IF NOT EXISTS user(
	name VARCHAR(20) NOT NULL PRIMARY KEY,
	password VARCHAR(20) NOT NULL,
	hair INT,
	skin INT,
	outfit INT
);

CREATE TABLE IF NOT EXISTS final_score(
	name VARCHAR(20) NOT NULL,
	score INT,
	PRIMARY KEY (name, score),
	FOREIGN KEY (name) REFERENCES user (name)
	ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scores(
	name VARCHAR(20) NOT NULL,
	score INT,
	PRIMARY KEY (name, score),
	FOREIGN KEY (name) REFERENCES user (name)
	ON DELETE CASCADE,
	FOREIGN KEY (score) REFERENCES final_score (score)
);

CREATE TABLE IF NOT EXISTS save(
	save_id INT PRIMARY KEY,
	last_level_completed INT,
	current_score INT
);

CREATE TABLE IF NOT EXISTS saves(
	name VARCHAR(20) NOT NULL,
	save_id INT,
	PRIMARY KEY (name, save_id),
	FOREIGN KEY (name) REFERENCES user (name)
	ON DELETE CASCADE,
	FOREIGN KEY (save_id) REFERENCES save (save_id)
);


