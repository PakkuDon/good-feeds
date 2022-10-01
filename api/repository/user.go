package repository

import (
	"database/sql"

	"github.com/PakkuDon/good-breads/api/model"
)

func GetUserById(database *sql.DB, userId int64) (*model.User, error) {
	row := database.QueryRow(`
		SELECT id, username, email
		FROM users
		WHERE id = ?
	`, userId)

	user := &model.User{}
	if err := row.Scan(&user.ID, &user.Username, &user.Email); err != nil {
		return nil, err
	}
	return user, nil
}
