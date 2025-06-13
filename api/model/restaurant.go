package model

import "time"

type Link struct {
	Label string `json:"label"`
	URL   string `json:"url"`
}

type Restaurant struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Address     string    `json:"address"`
	Latitude    float64   `json:"latitude"`
	Longitude   float64   `json:"longitude"`
	Options     []string  `json:"options"`
	Links       []Link    `json:"links"`
	AddedAt     time.Time `json:"addedAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	Visited     bool      `json:"visited"`
	Status      string    `json:"status"`
}
