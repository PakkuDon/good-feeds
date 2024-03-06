ALTER TABLE restaurants
  ADD COLUMN status ENUM("Operational", "Temporarily closed", "Permanently closed", "Unlisted") NOT NULL DEFAULT "Operational";
