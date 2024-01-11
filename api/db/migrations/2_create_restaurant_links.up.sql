CREATE TABLE IF NOT EXISTS restaurant_links (
    id INT NOT NULL AUTO_INCREMENT,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    restaurant_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);
