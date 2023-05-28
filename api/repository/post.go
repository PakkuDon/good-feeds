package repository

import (
	"database/sql"

	"github.com/PakkuDon/good-feeds/api/model"
)

func GetPlaces(database *sql.DB) ([]model.Place, error) {
	places := []model.Place{}
	rows, err := database.Query("SELECT * FROM places")
	defer rows.Close()

	for rows.Next() {
		place := model.Place{}
		if err := rows.Scan(&place.ID, &place.Title, &place.ImageURL, &place.Description, &place.UserID); err != nil {
			return []model.Place{}, err
		}
		places = append(places, place)
	}

	return places, err
}

func GetPlaceById(database *sql.DB, postId int64) (*model.Place, error) {
	row := database.QueryRow(`
		SELECT *
		FROM places
		WHERE id = ?
	`, postId)

	place := &model.Place{}
	if err := row.Scan(&place.ID, &place.Title, &place.ImageURL, &place.Description, &place.UserID); err != nil {
		return nil, err
	}

	return place, nil
}

func GetPlacesByUserId(database *sql.DB, userId int64) ([]model.Place, error) {
	places := []model.Place{}
	rows, err := database.Query(`
		SELECT *
		FROM places
		WHERE user_id = ?
	`, userId)
	defer rows.Close()

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		place := model.Place{}
		if err := rows.Scan(&place.ID, &place.Title, &place.ImageURL, &place.Description, &place.UserID); err != nil {
			if err != nil {
				return nil, err
			}
		}
		places = append(places, place)
	}

	return places, nil
}

func InsertPlace(database *sql.DB, place *model.Place) error {
	_, err := database.Exec(`INSERT INTO places (title, description, image_url, user_id) VALUES (?, ?, ?, ?)`,
		place.Title,
		place.Description,
		place.ImageURL,
		place.UserID,
	)
	if err != nil {
		return err
	}
	return nil
}
