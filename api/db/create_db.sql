CREATE DATABASE IF NOT EXISTS good_feeds;

USE good_feeds;

CREATE TABLE IF NOT EXISTS restaurants (
    id INT NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6),
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    added_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,

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

CREATE TABLE IF NOT EXISTS dietary_options (
    id INT NOT NULL AUTO_INCREMENT,
    label TEXT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS restaurant_dietary_options (
    restaurant_id INT NOT NULL,
    dietary_option_id INT NOT NULL,

    PRIMARY KEY (restaurant_id, dietary_option_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (dietary_option_id) REFERENCES dietary_options(id)
);
