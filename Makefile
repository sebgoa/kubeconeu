all: build open

build: 
	markdown-to-slides -s slides.css -o kubeconeu.html kubeconeu.md

open:
	open kubeconeu.html
