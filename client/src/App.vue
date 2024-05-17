<script>
import io from 'socket.io-client';
import InputBox from './components/InputBox.vue';
import MessageBox from './components/MessageBox.vue';
import SearchBox from './components/SearchBox.vue';
import MeetButton from './components/MeetButton.vue';

export default {
	components: {
		InputBox,
		MessageBox,
		SearchBox,
		MeetButton
	},
	data() {
		return {
			inputValue: '', // Initialize input value as an empty string
			databases: [],
			messages: [],
			username: '',
			socket: null,
			query: ''
		};
	},
	methods: {
		async generateUsername() {
			try {
				const response = await fetch('http://localhost:3000' + '/generateUsername');
				if (response.ok) {
					const data = await response.json();
					this.username = data.username;
				}
				else {
					// Response was not okay
				}
			} catch (error) {
				console.error('Error reaching server: ', error);
			}
		},
		sendMessage() {
			if (this.inputValue === '') {
				return;
			}
			this.socket.emit('message', { username: this.username, message: this.inputValue });
			this.inputValue = '';
		},
	},
	mounted() {
		this.generateUsername();

		this.socket = io('http://localhost:3000');

		this.socket.on('connect', () => {
			console.log('Connected to socket.io server!');
		});

		this.socket.on('disconnect', () => {
			console.log('Disconnected from socket.io server!');
		});

		this.socket.on('message', ({ username, message }) => {
			console.log('Received message:', message);
			const isReceived = username !== this.username;
			this.messages.push({ username, message, isReceived });
		});

		this.username = 'Anonymous';
	},
	computed: {
		usersMatch(messageObject) {
			return messageObject.username === this.username;
		}
	}
}; 
</script>

<template>
	<div>
		<div class='app'>
			<div class='menu'>
				{{ username }}
				<MeetButton />
				<SearchBox :modelValue='query' placeholder='Search' />
			</div>
			<div class='chat-window'>
				<div class="messages">
					<MessageBox v-for='messageObject in messages' :key='messageObject' :messageObject='messageObject'
						:isReceived='messageObject.isReceived'></MessageBox>
				</div>
				<form @submit.prevent='sendMessage'>
					<InputBox id='chat-input' v-model='inputValue' placeholder='Type a chat message...' />
				</form>
			</div>
		</div>
	</div>
	<div>

	</div>
</template>

<style>
html {
	font-family: 'sarabun', sans-serif;
}

.messages {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 20px 20px 0px 20px;
	height: 90%;
	overflow-y: auto;
}

/* Desktop styling */
.app {
	display: grid;
	grid-template-columns: 5fr 12fr;
	color: white;
}

.menu {
	background-color: #191919;
	background-image:
		radial-gradient(circle at -15vw -40vh, #f2d54152, #191919 45%);
	background-repeat: no-repeat;
	height: 100vh;
}

.chat-window {
	background-color: #101010;
	background-image:
		radial-gradient(circle at top right, #4f22f223, #101010 30%),
		radial-gradient(circle at bottom left, #4f22f213, #101010 50%),
		radial-gradient(circle at 50vw 30vh, #4f22f228, #101010 40%),
		radial-gradient(circle at top left, #000000, #101010 40%);
	background-size: 50% 50%;
	background-position: top right, bottom left, bottom right, top left;
	background-repeat: no-repeat;
	height: 100vh;
	display: flex;
	flex-direction: column;
}

/* Mobile */
</style>
