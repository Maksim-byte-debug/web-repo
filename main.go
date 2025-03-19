package main

import (
	"WebPotfolio/dbController"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Data struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Comment string `json:"comment"`
}

func requestSQL() ([]Data, error) {
	rows, err := dbController.DB.Query("SELECT id, name, email, comment FROM rewies")
	if err != nil {
		log.Printf("Ошибка при запросе к базе: %v", err)
		return nil, err
	}
	defer rows.Close()

	var datas []Data
	for rows.Next() {
		var data Data
		err = rows.Scan(&data.ID, &data.Name, &data.Email, &data.Comment)
		if err != nil {
			log.Printf("Ошибка при сканировании строки: %v", err)
			return nil, err
		}
		datas = append(datas, data)
		log.Printf("Получена запись: %+v", data)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Ошибка после обработки строк: %v", err)
		return nil, err
	}

	log.Printf("Всего записей: %d", len(datas))
	return datas, nil
}

func serializationJSON(datas []Data) ([]byte, error) {
	jsonData, err := json.Marshal(datas)
	if err != nil {
		log.Printf("Ошибка при сериализации в JSON: %v", err)
		return nil, err
	}
	return jsonData, nil
}

func main() {
	// Подключение к базе данных
	dbController.DbConnect()
	defer dbController.DB.Close()

	// Создание экземпляра Gin
	r := gin.Default()

	// Статические файлы и главная страница
	r.Static("/static", "./public")
	r.StaticFile("/", "./public/index.html")

	// GET /data — получение отзывов
	r.GET("/data", func(c *gin.Context) {
		datas, err := requestSQL()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if datas == nil {
			datas = []Data{}
		}

		jsonData, err := serializationJSON(datas)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Header("Content-Type", "application/json")
		c.Writer.Write(jsonData)
	})

	// POST /data — добавление нового отзыва
	r.POST("/data", func(c *gin.Context) {
		var newData Data
		if err := c.ShouldBindJSON(&newData); err != nil {
			log.Printf("Ошибка при декодировании JSON: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
			return
		}

		_, err := dbController.DB.Exec(
			"INSERT INTO rewies (name, email, comment) VALUES ($1, $2, $3)",
			newData.Name, newData.Email, newData.Comment,
		)
		if err != nil {
			log.Printf("Ошибка при вставке в базу: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Отзыв успешно добавлен",
			"data":    newData,
		})
	})

	// Запуск сервера
	log.Fatal(r.Run(":8080"))
}
