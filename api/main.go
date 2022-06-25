package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Post struct {
	ID          int64
	Title       string
	ImageURL    string
	Description string
	UserID      int64
}

type User struct {
	ID       int64
	Username string
	Email    string
}

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
	posts := []Post{}
	rows, err := app.database.Query("SELECT * FROM posts")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		post := Post{}
		if err := rows.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
			panic(err)
		}
		posts = append(posts, post)
	}
	jsonString, err := json.Marshal(posts)
	if err != nil {
		panic(err)
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

	post := Post{}
	if err := row.Scan(&post.ID, &post.Title, &post.ImageURL, &post.Description, &post.UserID); err != nil {
		panic(err)
	}
	jsonString, err := json.Marshal(post)
	if err != nil {
		panic(err)
	}

	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprint(writer, string(jsonString))
}

func (app Api) RegisterRoutes(router *chi.Mux) {
	router.Get("/healthcheck", app.healthCheck)
	router.Get("/api/posts", app.getPosts)
	router.Get("/api/posts/{id}", app.getPost)
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
