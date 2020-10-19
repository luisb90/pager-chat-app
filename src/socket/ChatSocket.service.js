import io from 'socket.io-client';

let socket;

class ChatSocketService {
  constructor(url, callbacks = {}) {
    socket = io(url);

    socket
      .on('user-connected', callbacks.userConnected || (() => {}))
      .on('user-disconnected', callbacks.userDisconnected || (() => {}))
      .on('is-typing', callbacks.isTyping || (() => {}))
      .on('message', callbacks.message || (() => {}));
  }

  sendTextMessage(message) {
    socket.emit('text-message', message);
  }

  setTypingStatus(status) {
    socket.emit('typing', status);
  }

  disconnect() {
    socket.disconnect();
  }
}

export default ChatSocketService;
