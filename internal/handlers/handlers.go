package handlers

import (
	"net/http"

	"github.com/truby4/web_app_udemy_tsawler/internal/config"
	"github.com/truby4/web_app_udemy_tsawler/internal/render"
)

var Repo *Repository

type Repository struct {
	App *config.AppConfig
}

func NewRepo(a *config.AppConfig) *Repository {
	return &Repository{
		App: a,
	}
}

func NewHandlers(r *Repository) {
	Repo = r
}

func (m *Repository) Home(w http.ResponseWriter, r *http.Request) {
	render.Render(w, "home.page.tmpl")
}

func (m *Repository) About(w http.ResponseWriter, r *http.Request) {
	render.Render(w, "about.page.tmpl")
}
