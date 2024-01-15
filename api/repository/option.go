package repository

import (
	"database/sql"
	"log"

	"github.com/PakkuDon/good-feeds/api/model"
)

func GetOptions(database *sql.DB) ([]model.Option, error) {
	options := []model.Option{}
	rows, err := database.Query("SELECT * FROM options")

	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		option := model.Option{}
		if err := rows.Scan(
			&option.ID,
			&option.Label,
			&option.Type,
		); err != nil {
			return []model.Option{}, err
		}
		options = append(options, option)
	}

	return options, err
}
