package model

type Review struct {
	ID      int64  `json:"id"`
	Body    string `json:"body"`
	Rating  int32  `json:"rating"`
	UserID  int64  `json:"userId"`
	PlaceID int64  `json:"placeId"`
}
