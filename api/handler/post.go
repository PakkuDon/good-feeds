package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/PakkuDon/good-breads/api/model"
	"github.com/go-chi/chi/v5"
)

func GetPosts(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		posts := []model.Post{}
		rows, err := database.Query("SELECT * FROM posts")
		defer rows.Close()
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			writer.Write([]byte{})
			return
		}

		for rows.Next() {
			post := model.Post{}
			if err := rows.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
				log.Println(err)
				writer.Header().Set("Content-Type", "application/json")
				writer.WriteHeader(500)
				writer.Write([]byte{})
				return
			}
			posts = append(posts, post)
		}
		jsonString, err := json.Marshal(posts)
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			return
		}

		writer.Header().Set("Content-Type", "application/json")
		fmt.Fprint(writer, string(jsonString))
	}
}

func GetPost(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		postId := chi.URLParam(request, "id")
		row := database.QueryRow(`
			SELECT *
			FROM posts
			WHERE id = ?
		`, postId)

		post := model.Post{}
		if err := row.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(404)
			writer.Write([]byte{})
			return
		}
		jsonString, err := json.Marshal(post)
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			writer.Write([]byte{})
			return
		}

		writer.Header().Set("Content-Type", "application/json")
		fmt.Fprint(writer, string(jsonString))
	}
}
