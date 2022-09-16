# Simple React Golang Real-time Messenger

A light, real-time chat application with vanilla TypeScript CRA frontend and Golang backend.

Implements Gorilla WebSocket framework and example code for handling WebSocket connection and uses a custom WebSocket Event type:

````
interface WsMessage {
  event: string; //Name of event to be triggered
  status: number; //Status code, similar to REST API status code
  body: any; //Content to be sent
}
````

# Run the code

In one terminal: 
````
cd chat-client
npm run start
````

In a separate terminal:
````
cd chat-server
go run main.go
````


<img width="1249" alt="Instant_Messenger" src="https://user-images.githubusercontent.com/98235574/190554335-9ed202ef-f53a-4d8d-81c3-b0f277365fea.png">
