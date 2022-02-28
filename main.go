package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/healthcheck", healthCheck)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
