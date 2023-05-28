package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/PakkuDon/good-feeds/api/model"
	"github.com/PakkuDon/good-feeds/api/repository"
	"github.com/go-chi/chi/v5"
)

func GetPlaces(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		places, err := repository.GetPlaces(database)
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			writer.Write([]byte{})
			return
		}

		jsonString, err := json.Marshal(places)
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

func GetPlace(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		placeId, err := strconv.Atoi(chi.URLParam(request, "id"))
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(404)
			writer.Write([]byte{})
			return
		}
		place, err := repository.GetPlaceById(database, int64(placeId))
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(404)
			writer.Write([]byte{})
			return
		}
		jsonString, err := json.Marshal(place)
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

func CreatePlace(database *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		place := model.Place{}
		err := json.NewDecoder(request.Body).Decode(&place)
		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			writer.Write([]byte{})
			return
		}

		err = repository.InsertPlace(database, &place)

		if err != nil {
			log.Println(err)
			writer.Header().Set("Content-Type", "application/json")
			writer.WriteHeader(500)
			writer.Write([]byte{})
			return
		}
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(201)
		writer.Write([]byte{})
		return
	}
}
