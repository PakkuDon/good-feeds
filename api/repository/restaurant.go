package repository

import (
	"database/sql"
	"encoding/json"
	"log"

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
			JSON_ARRAYAGG(dietary_options.label) as dietary_options
		FROM restaurants
		LEFT JOIN restaurant_dietary_options ON restaurants.id = restaurant_dietary_options.restaurant_id
		LEFT JOIN dietary_options ON restaurant_dietary_options.dietary_option_id = dietary_options.id
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
		parsedOptions := []string{}
		if err := rows.Scan(
			&restaurant.ID,
			&restaurant.Name,
			&restaurant.Address,
			&restaurant.Latitude,
			&restaurant.Longitude,
			&restaurant.ImageURL,
			&restaurant.Description,
			&optionsJson,
		); err != nil {
			return []model.Restaurant{}, err
		}
		_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
		restaurant.DietaryOptions = parsedOptions
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
			JSON_ARRAYAGG(dietary_options.label) as dietary_options
		FROM restaurants
		LEFT JOIN restaurant_dietary_options ON restaurants.id = restaurant_dietary_options.restaurant_id
		LEFT JOIN dietary_options ON restaurant_dietary_options.dietary_option_id = dietary_options.id
		WHERE restaurants.id = ?
		GROUP BY restaurants.id
	`, restaurantId)

	restaurant := &model.Restaurant{}
	optionsJson := []byte{}
	parsedOptions := []string{}
	if err := row.Scan(
		&restaurant.ID,
		&restaurant.Name,
		&restaurant.Address,
		&restaurant.Latitude,
		&restaurant.Longitude,
		&restaurant.ImageURL,
		&restaurant.Description,
		&optionsJson,
	); err != nil {
		return nil, err
	}

	_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
	restaurant.DietaryOptions = parsedOptions
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
