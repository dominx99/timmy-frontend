import store from '../store/index';

export default class Socket {
  static subscribeUser(userId) {
    if (userId === null || userId === undefined || userId === '') {
      return;
    }

    window.socket.subscribe(userId)
  }
}
