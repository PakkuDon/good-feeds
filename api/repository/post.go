package repository

import (
	"database/sql"

	"github.com/PakkuDon/good-feeds/api/model"
)

func GetPosts(database *sql.DB) ([]model.Place, error) {
	posts := []model.Place{}
	rows, err := database.Query("SELECT * FROM posts")
	defer rows.Close()

	for rows.Next() {
		post := model.Place{}
		if err := rows.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
			return []model.Place{}, err
		}
		posts = append(posts, post)
	}

	return posts, err
}

func GetPostById(database *sql.DB, postId int64) (*model.Place, error) {
	row := database.QueryRow(`
		SELECT *
		FROM posts
		WHERE id = ?
	`, postId)

	post := &model.Place{}
	if err := row.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
		return nil, err
	}

	return post, nil
}

func GetPostsByUserId(database *sql.DB, userId int64) ([]model.Place, error) {
	posts := []model.Place{}
	rows, err := database.Query(`
		SELECT *
		FROM posts
		WHERE user_id = ?
	`, userId)
	defer rows.Close()

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		post := model.Place{}
		if err := rows.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
			if err != nil {
				return nil, err
			}
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func InsertPost(database *sql.DB, post *model.Place) error {
	_, err := database.Exec(`INSERT INTO posts (title, description, image_url, user_id) VALUES (?, ?, ?, ?)`,
		post.Title,
		post.Description,
		post.ImageURL,
		post.UserID,
	)
	if err != nil {
		return err
	}
	return nil
}
