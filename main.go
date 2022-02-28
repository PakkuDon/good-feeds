package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func healthCheck(writer http.ResponseWriter, request *http.Request) {
	status := map[string]string{"status": "ok"}
	jsonString, _ := json.Marshal(status)
	fmt.Fprint(writer, string(jsonString))
}

func main() {
	http.HandleFunc("/healthcheck", healthCheck)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
