package repository

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"strings"
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
			restaurants.description,
			restaurants.visited,
			restaurants.status,
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
		WHERE status != "Unlisted"
	`)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	_, offset := time.Now().Zone()

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
			&restaurant.Description,
			&restaurant.Visited,
			&restaurant.Status,
			&addedAtByteArray,
			&updatedAtByteArray,
			&optionsJson,
			&linksJson,
		); err != nil {
			return []model.Restaurant{}, err
		}

		// Coerce timestamps to RFC3339 and include local timezone as times are not stored in UTC
		restaurant.AddedAt, _ = time.Parse(time.RFC3339, fmt.Sprintf("%v+%v:00", strings.Replace(string(addedAtByteArray), " ", "T", 1), offset/60/60))
		restaurant.UpdatedAt, _ = time.Parse(time.RFC3339, fmt.Sprintf("%v+%v:00", strings.Replace(string(updatedAtByteArray), " ", "T", 1), offset/60/60))

		_ = json.Unmarshal([]byte(optionsJson), &parsedOptions)
		_ = json.Unmarshal([]byte(linksJson), &parsedLinks)
		restaurant.Options = parsedOptions
		restaurant.Links = parsedLinks
		restaurants = append(restaurants, restaurant)
	}

	return restaurants, err
}
