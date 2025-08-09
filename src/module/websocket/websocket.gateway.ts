import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";

// const users = [
//     {
// name:'dave',
// password:1234
// }
// {
// name:'joe',
// password:1234
// }
// ]


@WebSocketGateway({cors:{origin:'*'}})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{
private readonly logger = new Logger(ChatGateway.name)


@WebSocketServer() server:Server;

handleConnection(client: Socket) {
client.broadcast.emit('connected',{message:`New User Joined ${client.id}`})
}

handleDisconnect(client: Socket) {
client.broadcast.emit('disconnected',{message:` User Left ${client.id}`})
}

@SubscribeMessage('message')
handleNewMessages(client:Socket, message:any){
// this.server.emit('message',`@${client.id}: ${message}`)

client.broadcast.emit('message',message)


}

}