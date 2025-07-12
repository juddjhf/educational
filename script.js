const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.id = msg.id;
  li.innerHTML = `
    <span>${msg.text}</span>
    <div class="actions">
      <button onclick="deleteForMe(${msg.id})">Delete for Me</button>
      <button onclick="deleteForEveryone(${msg.id})">Delete for Everyone</button>
    </div>
  `;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('delete message', (id) => {
  const msg = document.getElementById(id);
  if (msg) msg.remove();
});

function deleteForMe(id) {
  socket.emit('delete message for me', { id });
}

function deleteForEveryone(id) {
  socket.emit('delete message for everyone', { id });
}
