package model

type Post struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	ImageURL    string `json:"imageUrl"`
	Description string `json:"description"`
	UserID      int64  `json:"userId"`
}
