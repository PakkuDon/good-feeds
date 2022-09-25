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

func GetUser(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		userId := chi.URLParam(request, "id")
		row := database.QueryRow(`
			SELECT id, username, email
			FROM users
			WHERE id = ?
		`, userId)

		user := model.User{}
		if err := row.Scan(&user.ID, &user.Username, &user.Email); err != nil {
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
