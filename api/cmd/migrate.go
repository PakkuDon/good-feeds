package main

import (
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal(err)
	}
	m, err := migrate.New(
		"file://db/migrations",
		fmt.Sprintf("mysql://%v", os.Getenv("DATABASE_URL")),
	)
	if err != nil {
		log.Fatal(err)
	} else {
		m.Up()
	}
}
