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
			restaurants.visited,
			restaurants.added_at,
			restaurants.updated_at,
			(
				SELECT JSON_ARRAYAGG(
					JSON_OBJECT("label", options.label, "type", options.type)
				)
				FROM options
				LEFT JOIN restaurant_options ON restaurant_options.option_id = options.id
				WHERE restaurant_options.restaurant_id = restaurants.id
			) AS options,
			(
				SELECT JSON_ARRAYAGG(
					JSON_OBJECT("label", restaurant_links.label, "url", restaurant_links.url)
				)
				FROM restaurant_links
				WHERE restaurant_id = restaurants.id
				GROUP BY restaurant_id
			) AS links
		FROM restaurants
	`)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		restaurant := model.Restaurant{}
		optionsJson := []byte{}
		linksJson := []byte{}
		addedAtByteArray := []byte{}
		updatedAtByteArray := []byte{}
		parsedOptions := []model.Option{}
		parsedLinks := []model.Link{}
		if err := rows.Scan(
			&restaurant.ID,
			&restaurant.Name,
			&restaurant.Address,
			&restaurant.Latitude,
			&restaurant.Longitude,
			&restaurant.ImageURL,
			&restaurant.Description,
			&restaurant.Visited,
			&addedAtByteArray,
			&updatedAtByteArray,
			&optionsJson,
			&linksJson,
		); err != nil {
			return []model.Restaurant{}, err
		}

		restaurant.AddedAt, _ = time.Parse(time.DateTime, string(addedAtByteArray))
		restaurant.UpdatedAt, _ = time.Parse(time.DateTime, string(updatedAtByteArray))

		_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
		_ = json.Unmarshal([]byte(linksJson), &parsedLinks)
		restaurant.Options = parsedOptions
		restaurant.Links = parsedLinks
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
			restaurants.visited,
			restaurants.added_at,
			restaurants.updated_at,
			(
				SELECT JSON_ARRAYAGG(
					JSON_OBJECT("label", options.label, "type", options.type)
				)
				FROM options
				LEFT JOIN restaurant_options ON restaurant_options.option_id = options.id
				WHERE restaurant_options.restaurant_id = restaurants.id
			) AS options,
			(
				SELECT JSON_ARRAYAGG(
					JSON_OBJECT("label", restaurant_links.label, "url", restaurant_links.url)
				)
				FROM restaurant_links
				WHERE restaurant_id = restaurants.id
				GROUP BY restaurant_id
			) AS links
		FROM restaurants
		WHERE restaurants.id = ?
	`, restaurantId)

	restaurant := &model.Restaurant{}
	optionsJson := []byte{}
	linksJson := []byte{}
	addedAtByteArray := []byte{}
	updatedAtByteArray := []byte{}
	parsedOptions := []model.Option{}
	parsedLinks := []model.Link{}
	if err := row.Scan(
		&restaurant.ID,
		&restaurant.Name,
		&restaurant.Address,
		&restaurant.Latitude,
		&restaurant.Longitude,
		&restaurant.ImageURL,
		&restaurant.Description,
		&restaurant.Visited,
		&addedAtByteArray,
		&updatedAtByteArray,
		&optionsJson,
		&linksJson,
	); err != nil {
		return nil, err
	}

	restaurant.AddedAt, _ = time.Parse(time.DateTime, string(addedAtByteArray))
	restaurant.UpdatedAt, _ = time.Parse(time.DateTime, string(updatedAtByteArray))

	_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
	_ = json.Unmarshal([]byte(linksJson), &parsedLinks)
	restaurant.Options = parsedOptions
	restaurant.Links = parsedLinks
	return restaurant, nil
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
