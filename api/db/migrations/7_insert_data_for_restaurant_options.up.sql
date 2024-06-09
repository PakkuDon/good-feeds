INSERT INTO options (id, label, type)
SELECT id, label, "dietary"
FROM dietary_options;

INSERT INTO restaurant_options (restaurant_id, option_id)
SELECT restaurant_id, dietary_option_id
FROM restaurant_dietary_options;
