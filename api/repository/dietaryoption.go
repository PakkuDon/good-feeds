package repository

import (
	"database/sql"
	"log"

	"github.com/PakkuDon/good-feeds/api/model"
)

func GetDietaryOptions(database *sql.DB) ([]model.DietaryOption, error) {
	dietaryOptions := []model.DietaryOption{}
	rows, err := database.Query("SELECT * FROM dietary_options")

	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		option := model.DietaryOption{}
		if err := rows.Scan(
			&option.ID,
			&option.Label,
		); err != nil {
			return []model.DietaryOption{}, err
		}
		dietaryOptions = append(dietaryOptions, option)
	}

	return dietaryOptions, err
}
