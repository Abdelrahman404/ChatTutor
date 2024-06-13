const WebSocketHelper = vi.fn().mockImplementation(() => {
  return {
    send: vi.fn(),
    connect: vi.fn(),
    onMessage: vi.fn()
  }
})

export default WebSocketHelper
