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

func healthCheck(writer http.ResponseWriter, request *http.Request) {
	status := map[string]string{
		"status":        "ok",
		"db_connection": "connected",
	}

	databaseUrl := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", databaseUrl)
	if err != nil {
		log.Fatal(err)
		status["db_connection"] = "disconnected"
	}

	pingError := db.Ping()
	if pingError != nil {
		log.Fatal(pingError)
		status["db_connection"] = "disconnected"
	}

	jsonString, _ := json.Marshal(status)
	fmt.Fprint(writer, string(jsonString))
}

func getPosts(writer http.ResponseWriter, request *http.Request) {
	databaseUrl := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", databaseUrl)
	if err != nil {
		panic(err)
	}

	posts := []Post{}
	rows, err := db.Query("SELECT * FROM posts")
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

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal(err)
	}

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Get("/healthcheck", healthCheck)
	router.Get("/api/posts", getPosts)

	log.Println("Server running on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
