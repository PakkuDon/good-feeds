# Good Breads 🍞

A place to share your bready creations.

## Development instructions
- Create database
```sql
$ mysql
source db/create_db.sql
```
- Configure environment variables
```sh
cp .env.example .env
# Edit .env file
```
- Run application
```sh
go run main.go
```

## Architecture Decisions

This project uses [Architecture Decision Records](https://adr.github.io/) to capture the rationale behind architecturally significant decisions. They can be found at [`doc/architecture/decisions`](doc/architecture/decisions)
