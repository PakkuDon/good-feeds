package model

type Restaurant struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	ImageURL    string `json:"imageUrl"`
	Description string `json:"description"`
}
