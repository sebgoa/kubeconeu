package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

func main() {
	url, err := url.Parse(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}
	log.Fatal(http.ListenAndServe(":80", httputil.NewSingleHostReverseProxy(url)))
}
