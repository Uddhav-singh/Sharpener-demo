// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.urlencoded({extended:false}))
// const port = 3000;

// app.get('/login', (req,res,next)=>{
//     console.log("This response is from GET:/login");
//     res.send(`<form action="/" method="GET">
//         <input type="text" name="username">
//         <button type="submit">Login</button>
//         </form>`)
// })

// app.get("/", (req,res,next)=>{
//     console.log("This response is from GET:/");
//     const username = req.body.username;
//     const name = localStorage.setItem("username", username);
//     res.send(`<form action="/" method="GET">
//         <input type="text" name="message">
//         <button type="submit">Send</button>
//         </form>`)
// })

// app.listen(port, ()=>{
//     console.log(`app is running on port: ${port}`)
// })

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
            <h1>No chats yet!</h1>
            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Login</button>
            </form>

            <script>
                document.getElementById('loginForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const username = document.getElementById('username').value;

                    fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            localStorage.setItem('username', username);
                            window.location.href = '/';
                        } else {
                            alert('Login failed');
                        }
                    });
                });
            </script>
        
    `);
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username } = req.body;
    res.json({ success: true, username });
});

// Serve the main chat page
app.get('/', (req, res) => {
    res.send(`
            <div id="messageFormContainer">
                <form id="messageForm">
                    <label for="message">Message:</label>
                    <input type="text" id="message" name="message" required>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div id="messagesContainer">
                
                <ol id="messagesList"></ol>
            </div>

            <script>
                const username = localStorage.getItem('username');
                if (!username) {
                    window.location.href = '/login';
                }

                document.getElementById('messageForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const message = document.getElementById('message').value;

                    fetch('/send-message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, message })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            document.getElementById('message').value = '';
                            loadMessages();
                        } else {
                            alert('Failed to send message');
                        }
                    });
                });

                function loadMessages() {
                    fetch('/messages')
                        .then(response => response.json())
                        .then(messages => {
                            const messagesList = document.getElementById('messagesList');
                            messagesList.innerHTML = '';
                            messages.forEach(message => {
                                const listItem = document.createElement('li');
                                listItem.textContent = \`\${message.username}: \${message.message}\`;
                                messagesList.appendChild(listItem);
                            });
                        });
                }

                loadMessages();
            </script>
        
    `);
});

// Handle message POST request
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    const newMessage = `${username}:${message}\n`;

    fs.appendFile('messages.txt', newMessage, err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Handle messages GET request
app.get('/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!data) {
            return res.json([]); // Return an empty array if the file is empty
        }
        const messages = data.trim().split('\n').map(line => {
            const [username, ...messageParts] = line.split(':');
            return { username, message: messageParts.join(':') };
        });
        res.json(messages);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
