package model

type Restaurant struct {
	ID             int64    `json:"id"`
	Name           string   `json:"name"`
	ImageURL       string   `json:"imageUrl"`
	Description    string   `json:"description"`
	Address        string   `json:"address"`
	Latitude       float64  `json:"latitude"`
	Longitude      float64  `json:"longitude"`
	DietaryOptions []string `json:"dietaryOptions"`
}
