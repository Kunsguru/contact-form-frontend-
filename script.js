const adminPassword = '1234'; // Set your admin password here

        async function submitForm(event) {
            event.preventDefault();
            const name = document.getElementById('user_name').value;
            const email = document.getElementById('user_email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const messageData = { name, email, phone, message };

            try {
                const response = await fetch('https://message-from-a-client0.onrender.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                });
                const data = await response.json();
                alert('Message submitted successfully!');
                document.getElementById('contactForm').reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit message.');
            }
        }

        async function fetchMessages() {
            try {
                const response = await fetch('https://message-from-a-client0.onrender.com');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching messages:', error);
                return [];
            }
        }

        function displayMessage(message, index) {
            const messagesList = document.getElementById('messagesList');
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>Name: ${message.name}, Email: ${message.email}, Phone: ${message.phone}, Message: ${message.message}</span>`;
            messagesList.appendChild(listItem);
        }

        async function displayAllMessages() {
            const messages = await fetchMessages();
            const messagesList = document.getElementById('messagesList');
            messagesList.innerHTML = ''; // Clear previous entries
            messages.forEach(displayMessage);
        }

        document.getElementById('contactForm').addEventListener('submit', submitForm);

        document.getElementById('viewMessagesButton').addEventListener('click', async function() {
            const password = prompt('Enter the admin password:');
            if (password === adminPassword) {
                await displayAllMessages();
                document.getElementById('messagesOverlay').style.display = 'flex';
            } else {
                alert('Incorrect password. Access denied.');
            }
        });

        document.getElementById('closeMessagesOverlayButton').addEventListener('click', function() {
            document.getElementById('messagesOverlay').style.display = 'none';
        });

        document.getElementById('homeButton').addEventListener('click', function() {
            window.location.href = 'https://artswithartsybasy01.onrender.com/'; // Adjust the URL to the correct path for your home page
        });
