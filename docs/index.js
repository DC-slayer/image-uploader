const messageElement = document.createElement('div');
messageElement.className = 'message';
messageElement.textContent = userMessage;

chatContainer.appendChild(messageElement);

chatContainer.insertAdjacentHTML('beforeend', `<div class="message">${userMessage}</div>`);

messageElement.scrollIntoView({ behavior: 'smooth' });

const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');

sendButton.addEventListener('click', handleSendMessage);

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents line breaks if Shift is not held
      handleSendMessage();
    }
  });