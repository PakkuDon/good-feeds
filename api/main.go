package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/PakkuDon/good-breads/api/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Api struct {
	database *sql.DB
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
	app.registerRoutes(router)

	log.Println("Server running on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
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

func (app Api) registerRoutes(router *chi.Mux) {
	router.Get("/healthcheck", app.healthCheck)
	router.Get("/api/posts", handler.GetPosts(app.database))
	router.Get("/api/posts/{id}", handler.GetPost(app.database))
	router.Get("/api/users/{id}", handler.GetUser(app.database))
}
