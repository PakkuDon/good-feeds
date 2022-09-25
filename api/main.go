package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/PakkuDon/good-breads/api/model"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Api struct {
	database *sql.DB
}

func (app Api) healthCheck(writer http.ResponseWriter, request *http.Request) {
	status := map[string]string{
		"status":        "ok",
		"db_connection": "connected",
	}

	pingError := app.database.Ping()
	if pingError != nil {
		log.Fatal(pingError)
		status["db_connection"] = "disconnected"
	}

	jsonString, _ := json.Marshal(status)
	fmt.Fprint(writer, string(jsonString))
}

func (app Api) getPosts(writer http.ResponseWriter, request *http.Request) {
	posts := []model.Post{}
	rows, err := app.database.Query("SELECT * FROM posts")
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

func (app Api) getPost(writer http.ResponseWriter, request *http.Request) {
	postId := chi.URLParam(request, "id")
	row := app.database.QueryRow(`
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

func (app Api) getUser(writer http.ResponseWriter, request *http.Request) {
	userId := chi.URLParam(request, "id")
	row := app.database.QueryRow(`
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

func (app Api) RegisterRoutes(router *chi.Mux) {
	router.Get("/healthcheck", app.healthCheck)
	router.Get("/api/posts", app.getPosts)
	router.Get("/api/posts/{id}", app.getPost)
	router.Get("/api/users/{id}", app.getUser)
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal(err)
	}

	databaseUrl := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", databaseUrl)
	if err != nil {
		log.Fatal(err)
		return
	}

	app := Api{database: db}

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	app.RegisterRoutes(router)

	log.Println("Server running on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
