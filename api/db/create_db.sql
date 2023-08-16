CREATE DATABASE IF NOT EXISTS good_feeds;

USE good_feeds;

CREATE TABLE IF NOT EXISTS restaurants (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6),
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS restaurant_links (
    id INT NOT NULL AUTO_INCREMENT,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    restaurant_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);
