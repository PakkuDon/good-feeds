package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/PakkuDon/good-breads/api/model"
	"github.com/PakkuDon/good-breads/api/repository"
	"github.com/go-chi/chi/v5"
)

func GetUser(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		userId, err := strconv.Atoi(chi.URLParam(request, "id"))
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(400)
			writer.Write([]byte{})
			return
		}

		user, err := repository.GetUserById(database, int64(userId))
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(404)
			writer.Write([]byte{})
			return
		}
		jsonString, err := json.Marshal(user)
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

func GetPostsByUser(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		userId := chi.URLParam(request, "id")
		posts := []model.Post{}
		rows, err := database.Query(`
			SELECT *
			FROM posts
			WHERE user_id = ?
		`, userId)
		defer rows.Close()

		for rows.Next() {
			post := model.Post{}
			if err := rows.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
				if err != nil {
					log.Println(err)
					writer.Header().Set("Content-Type", "application/json")
					writer.WriteHeader(500)
					writer.Write([]byte{})
					return
				}
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
