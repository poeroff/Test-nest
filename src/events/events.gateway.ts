import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }
}
