import { mount } from '@vue/test-utils'
import ChatInterface from '../../components/ChatInterface.vue'
import WebSocketHelper from '../../helpers/websocketHelper'

// mock WebSocketHelper
vi.mock('../../helpers/websocketHelper')

describe('ChatInterface.vue', () => {
  let wrapper
  let wsMock

  beforeEach(() => {
    // mock WebSocketHelper instance
    wsMock = {
      send: vi.fn(),
      connect: vi.fn(),
      onMessage: vi.fn((callback) => {
        wsMock.send = (message) => callback(JSON.parse(message))
      }),
      sendMessage: vi.fn() // mock sendMessage function
    }

    // mock WebSocketHelper's implementation
    WebSocketHelper.mockImplementation(() => wsMock)

    wrapper = mount(ChatInterface, {
      data() {
        return {
          wsHelper: wsMock,
          username: 'user33', // eet a specific username
          messages: [
            { user: 'user33', text: 'Hello', timestamp: new Date().toISOString() },
            { user: 'user66', text: 'Hi there', timestamp: new Date().toISOString() }
          ],
          newMessage: '' // ensure newMessage is initialized
        }
      }
    })
  })

  it('renders messages', () => {
    const messages = wrapper.findAll('.chat-message')
    expect(messages.length).toBe(2)
    expect(messages.at(0).text()).toContain('Hello')
    expect(messages.at(1).text()).toContain('Hi there')
  })

  it('sends a message when the button is clicked', async () => {
    // Set the new message data
    await wrapper.setData({ newMessage: 'New message' })

    // Trigger button click to send message
    await wrapper.find('button').trigger('click')

    // Expect wsHelper.sendMessage to be called with the correct message
    expect(wsMock.sendMessage).toHaveBeenCalled()
  })

  it('formats the timestamp correctly', () => {
    const message = wrapper.find('.chat-message small')
    expect(message.text()).toMatch(/\d{1,2}:\d{2} [APM]{2}/)
  })
})
