package main

import (
	"log"
	"net/http"

	"github.com/truby4/web_app_udemy_tsawler/internal/config"
	"github.com/truby4/web_app_udemy_tsawler/internal/handlers"
	"github.com/truby4/web_app_udemy_tsawler/internal/render"
)

const portNumber = ":8080"

func main() {
	var app config.AppConfig

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal(err)
	}

	app.TemplateCache = tc
	app.UseCache = false

	repo := handlers.NewRepo(&app)
	handlers.NewHandlers(repo)

	render.NewTemplates(&app)

	http.HandleFunc("/", repo.Home)
	http.HandleFunc("/about", repo.About)

	log.Printf("starting server on port %s\n", portNumber)
	http.ListenAndServe(portNumber, nil)
}
