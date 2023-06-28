import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WsResponse
} from '@nestjs/websockets';

@WebSocketGateway(80, { cors: true })
export class ChatGateway {
	@SubscribeMessage('chat')
	handleEvent(@MessageBody() body): WsResponse<string> {
		console.log(body);
		return {
			event: 'idk',
			data: 'Hello'
		};
	}
}
