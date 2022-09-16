// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"log"
	"net/http"

	ws_controller "github.com/databitio/chat-app/chat-server/websocket"
)

func main() {
	hub := ws_controller.NewHub()
	go hub.Run()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		ws_controller.ServeWs(hub, w, r)
	})

	log.Println("Listening on localhost:8080...")
	err := http.ListenAndServe("localhost:8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
