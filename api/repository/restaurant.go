package repository

import (
	"database/sql"
	"encoding/json"
	"log"
	"time"

	"github.com/PakkuDon/good-feeds/api/model"
)

func GetRestaurants(database *sql.DB) ([]model.Restaurant, error) {
	restaurants := []model.Restaurant{}
	rows, err := database.Query(`
		SELECT
			restaurants.id,
			restaurants.name,
			restaurants.address,
			restaurants.latitude,
			restaurants.longitude,
			restaurants.image_url,
			restaurants.description,
			restaurants.added_at,
			restaurants.updated_at,
			JSON_ARRAYAGG(JSON_OBJECT("label", options.label, "type", options.type)) as options
		FROM restaurants
		LEFT JOIN restaurant_options ON restaurants.id = restaurant_options.restaurant_id
		LEFT JOIN options ON restaurant_options.option_id = options.id
		GROUP BY restaurants.id
	`)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		restaurant := model.Restaurant{}
		optionsJson := []byte{}
		addedAtByteArray := []byte{}
		updatedAtByteArray := []byte{}
		parsedOptions := []model.Option{}
		if err := rows.Scan(
			&restaurant.ID,
			&restaurant.Name,
			&restaurant.Address,
			&restaurant.Latitude,
			&restaurant.Longitude,
			&restaurant.ImageURL,
			&restaurant.Description,
			&addedAtByteArray,
			&updatedAtByteArray,
			&optionsJson,
		); err != nil {
			return []model.Restaurant{}, err
		}

		restaurant.AddedAt, _ = time.Parse(time.DateTime, string(addedAtByteArray))
		restaurant.UpdatedAt, _ = time.Parse(time.DateTime, string(updatedAtByteArray))

		_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
		links, err := GetLinksForRestaurant(database, restaurant.ID)
		if err != nil {
			return []model.Restaurant{}, err
		}
		restaurant.Options = parsedOptions
		restaurant.DietaryOptions = parsedOptions
		restaurant.Links = links
		restaurants = append(restaurants, restaurant)
	}

	return restaurants, err
}

func GetRestaurantById(database *sql.DB, restaurantId int64) (*model.Restaurant, error) {
	row := database.QueryRow(`
		SELECT
			restaurants.id,
			restaurants.name,
			restaurants.address,
			restaurants.latitude,
			restaurants.longitude,
			restaurants.image_url,
			restaurants.description,
			restaurants.added_at,
			restaurants.updated_at,
			JSON_ARRAYAGG(JSON_OBJECT("label", options.label, "type", options.type)) as options
		FROM restaurants
		LEFT JOIN restaurant_options ON restaurants.id = restaurant_options.restaurant_id
		LEFT JOIN options ON restaurant_options.option_id = options.id
		WHERE restaurants.id = ?
		GROUP BY restaurants.id
	`, restaurantId)

	restaurant := &model.Restaurant{}
	optionsJson := []byte{}
	addedAtByteArray := []byte{}
	updatedAtByteArray := []byte{}
	parsedOptions := []model.Option{}
	if err := row.Scan(
		&restaurant.ID,
		&restaurant.Name,
		&restaurant.Address,
		&restaurant.Latitude,
		&restaurant.Longitude,
		&restaurant.ImageURL,
		&restaurant.Description,
		&addedAtByteArray,
		&updatedAtByteArray,
		&optionsJson,
	); err != nil {
		return nil, err
	}

	restaurant.AddedAt, _ = time.Parse(time.DateTime, string(addedAtByteArray))
	restaurant.UpdatedAt, _ = time.Parse(time.DateTime, string(updatedAtByteArray))

	_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
	links, err := GetLinksForRestaurant(database, restaurant.ID)
	if err != nil {
		return nil, err
	}
	restaurant.Options = parsedOptions
	restaurant.DietaryOptions = parsedOptions
	restaurant.Links = links
	return restaurant, nil
}

func GetLinksForRestaurant(database *sql.DB, restaurantId int64) ([]model.Link, error) {
	row := database.QueryRow(`
		SELECT JSON_ARRAYAGG(JSON_OBJECT("label", restaurant_links.label, "url", restaurant_links.url)) as links
		FROM restaurant_links
		WHERE restaurant_id = ?
		GROUP BY restaurant_id
	`, restaurantId)

	links := []model.Link{}
	linksJson := []byte{}
	if err := row.Scan(
		&linksJson,
	); err != nil {
		if err.Error() == "sql: no rows in result set" {
			return []model.Link{}, nil
		}
		return nil, err
	}

	_ = json.Unmarshal(linksJson, &links)
	return links, nil
}

func InsertRestaurant(database *sql.DB, restaurant *model.Restaurant) error {
	_, err := database.Exec(`
		INSERT INTO restaurants (
			name,
			description,
			image_url,
			address,
			latitude,
			longitude
		) VALUES (?, ?, ?, ?, ?, ?)`,
		restaurant.Name,
		restaurant.Description,
		restaurant.ImageURL,
		restaurant.Address,
		restaurant.Latitude,
		restaurant.Longitude,
	)
	if err != nil {
		log.Fatal(err)
		return err
	}
	return nil
}
