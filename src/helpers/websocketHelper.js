class WebSocketHelper {
  constructor(url) {
    this.url = url
    this.ws = null
    this.onMessageCallback = null
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server')
      }

      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket server')
      }

      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (this.onMessageCallback) {
          this.onMessageCallback(message)
        }
      }
      return true
    } catch (error) {
      console.log('Failed to connect to WebSocket server, try again shortly')
      return false
    }
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  onMessage(callback) {
    this.onMessageCallback = callback
  }
}

export default WebSocketHelper
