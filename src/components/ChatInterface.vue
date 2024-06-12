<template>
    <div class="container p-0">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Chat</div>
                    <div class="card-body height3">
                        <ul class="chat-list">
                            <div v-for="message in messages" :key="message.user">
                                <li v-if="message.user == username" class="in">
                                    <div class="chat-img">
                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png">
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-message">
                                            <h5>
                                                You
                                                <small>
                                                    {{ formatTimestamp(message.timestamp) }}
                                                </small>
                                            </h5>
                                            <p>{{ message.text }}</p>
                                        </div>
                                    </div>
                                </li>
                                <li v-else class="out">
                                    <div class="chat-img">
                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png">
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-message">
                                            <h5>{{ message.user }}
                                                <small>
                                                    {{ formatTimestamp(message.timestamp) }}
                                                </small>
                                            </h5>
                                            <p>{{ message.text }}</p>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="flex-grow-0 py-3 px-4 border-top">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="newMessage" @keyup.enter="sendMessage"
                            placeholder="Type a message...">
                        <button class="btn btn-dark" @click="sendMessage">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import WebSocketHelper from '../helpers/websocketHelper';

export default {
    name: "ChatInterface",
    data() {
        return {
            messages: [],
            newMessage: '',
            ws: null,
            username: null,
        };
    },
    mounted() {
        this.connectWebSocket();
        this.generateUsername(); // generate unique username per each user
    },
    methods: {
        connectWebSocket() {
            const url = import.meta.env.VITE_WEBSOCKET_URL; // stored in global .env file
            this.wsHelper = new WebSocketHelper(url); // isolated in helper file for easier modification in the future for example replacing websocket by webrtc
            this.wsHelper.connect();
            this.wsHelper.onMessage((message) => {
                this.messages.push(message);
            });
        },
        sendMessage() {
            if (!this.newMessage.trim()) return;

            const message = this.createMessage(this.username, this.newMessage);
            this.wsHelper.sendMessage(message);
        },
        generateUsername() {
            this.username = `User${Math.floor(Math.random() * 101)}`;
        },
        formatTimestamp(timestamp) {
            return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        createMessage(user, text) {
            return {
                user,
                text,
                timestamp: new Date().toISOString(),
            };
        },
    },
}
</script>