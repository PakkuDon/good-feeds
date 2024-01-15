package model

import "time"

type Link struct {
	Label string `json:"label"`
	URL   string `json:"url"`
}

type Restaurant struct {
	ID             int64     `json:"id"`
	Name           string    `json:"name"`
	ImageURL       string    `json:"imageUrl"`
	Description    string    `json:"description"`
	Address        string    `json:"address"`
	Latitude       float64   `json:"latitude"`
	Longitude      float64   `json:"longitude"`
	DietaryOptions []string  `json:"dietaryOptions"`
	Options        []string  `json:"options"`
	Links          []Link    `json:"links"`
	AddedAt        time.Time `json:"addedAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
}
