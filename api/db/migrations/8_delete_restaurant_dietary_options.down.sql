CREATE TABLE IF NOT EXISTS restaurant_dietary_options (
    restaurant_id INT NOT NULL,
    dietary_option_id INT NOT NULL,

    PRIMARY KEY (restaurant_id, dietary_option_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (dietary_option_id) REFERENCES dietary_options(id)
);
