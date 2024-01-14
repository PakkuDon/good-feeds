CREATE TABLE IF NOT EXISTS restaurant_options (
    restaurant_id INT NOT NULL,
    option_id INT NOT NULL,

    PRIMARY KEY (restaurant_id, option_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (option_id) REFERENCES options(id)
);
