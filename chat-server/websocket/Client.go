// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ws_controller

import (
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/gorilla/websocket"
)

type Client struct {
	username string
	hub      *Hub
	conn     *websocket.Conn
	send     chan interface{}
}

type WsEvent struct {
	Event  string      `json:"event"`
	Status int         `json:"status"`
	Body   interface{} `json:"body"`
}

func (req *WsEvent) clear() {
	p := reflect.ValueOf(req).Elem()
	p.Set(reflect.Zero(p.Type()))
}

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (hub *Hub) GetUsersOnline() []string {
	client_list := []string{}
	hub.mu.Lock()
	for client := range hub.clients {
		client_list = append(client_list, client.username)
	}
	hub.mu.Unlock()
	return client_list
}

func (client *Client) readPump() {
	defer func() {
		client.hub.unregister <- client
		client.conn.Close()
	}()
	client.conn.SetReadLimit(maxMessageSize)
	client.conn.SetReadDeadline(time.Now().Add(pongWait))
	client.conn.SetPongHandler(func(string) error { client.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	var i interface{}
	wsReq := WsEvent{
		Event:  "",
		Status: -1,
		Body:   i,
	}

	for {
		err := client.conn.ReadJSON(&wsReq)
		if err != nil {
			log.Println(err)
			log.Println("error reading request")
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		wsReq.Status = 200
		if wsReq.Event == "users-online" {
			wsReq.Body = client.hub.GetUsersOnline()
		}

		client.hub.broadcast <- wsReq
		wsReq.clear()
	}
}

func (client *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		client.conn.Close()
	}()
	for {
		select {
		case message, ok := <-client.send:
			client.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				log.Println("Error sending message; closing...")
				client.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			err := client.conn.WriteJSON(message)
			if err != nil {
				return
			}

		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{username: "Anonymous", hub: hub, conn: conn, send: make(chan interface{})}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()

}
