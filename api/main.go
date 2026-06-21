package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/PakkuDon/good-feeds/api/handler"
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
	log.Fatal(http.ListenAndServe("localhost:8080", router))
}

func (app Api) healthCheck(writer http.ResponseWriter, request *http.Request) {
	status := map[string]string{
		"status":        "ok",
		"db_connection": "connected",
	}

	pingError := app.database.Ping()
	if pingError != nil {
		log.Println(pingError)
		writer.WriteHeader(500)
		status["db_connection"] = "disconnected"
	}

	jsonString, _ := json.Marshal(status)
	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprint(writer, string(jsonString))
}

func (app Api) registerRoutes(router *chi.Mux) {
	database := app.database

	router.Get("/healthcheck", app.healthCheck)

	router.Get("/api/restaurants", handler.GetRestaurants(database))
	router.Get("/api/options", handler.GetOptions(database))

	staticFileRoutes(router)
}

func staticFileRoutes(router chi.Router) {
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "static"))

	router.Get("/static/*", func(writer http.ResponseWriter, request *http.Request) {
		routeContext := chi.RouteContext(request.Context())
		pathPrefix := strings.TrimSuffix(routeContext.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(filesDir))
		fs.ServeHTTP(writer, request)
	})
}
