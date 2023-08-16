CREATE DATABASE IF NOT EXISTS good_feeds;

USE good_feeds;

CREATE TABLE IF NOT EXISTS places (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,

    PRIMARY KEY (id)
);
