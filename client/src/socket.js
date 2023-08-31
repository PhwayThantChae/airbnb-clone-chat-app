import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "ws://localhost:8900";

export const socket = io(URL);