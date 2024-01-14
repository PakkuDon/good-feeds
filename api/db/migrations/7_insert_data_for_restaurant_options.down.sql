INSERT INTO dietary_options (id, label)
SELECT id, label
FROM options
WHERE type = "dietary";

INSERT INTO restaurant_dietary_options (restaurant_id, dietary_option_id)
SELECT restaurant_id, option_id
FROM restaurant_options
WHERE option_id IN (
  SELECT id
  FROM options
  WHERE type = "dietary"
);
