package dbController

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var DB *sql.DB

// Review структура для хранения информации об отзыве

func DbConnect() {
	connStr := "user=postgres dbname=testdb sslmode=disable"
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	print("Database connected\n")
}
