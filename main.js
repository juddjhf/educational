const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;
app.use(express.static(__dirname));




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/Acc.html', (req, res) => {
  res.sendFile(__dirname + '/public/Acc.html');
});
app.get('/Maths.html', (req, res) => {
  res.sendFile(__dirname + '/public/Maths.html');
});
app.get('/Eco.html', (req, res) => {
  res.sendFile(__dirname + '/public/Eco.html');
});
app.get('/English.html', (req, res) => {
  res.sendFile(__dirname + '/public/English.html');
});
app.get('/BST.html', (req, res) => {
res.sendFile(__dirname + '/public/BST.html');
});
app.get('/Ch-1index.html', (req, res) => {
res.sendFile(__dirname + '/public/Ch-1index.html');
});
app.get('/Ch-2index.html', (req, res) => {
res.sendFile(__dirname + '/public/Ch-2index.html');
});

app.get('/Ch-3index.html', (req, res) => {
  res.sendFile(__dirname + '/public/Ch-3index.html');
  })

  app.get('/Contact.html', (req, res) => {
    res.sendFile(__dirname + '/public/Contact.html');
  }); 
  let users = {};
  let messages = [];
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    users[socket.id] = { online: true };
  
    // Send all old messages
    messages.forEach((msg) => {
      socket.emit('chat message', msg);
    });
  
    socket.on('chat message', (msgText) => {
      const msg = {
        id: Date.now(),
        text: msgText,
        sender: socket.id
      };
      messages.push(msg);
      io.emit('chat message', msg);
    });
  
    socket.on('delete message for me', (data) => {
      socket.emit('delete message', data.id);
    });
  
    socket.on('delete message for everyone', (data) => {
      messages = messages.filter((msg) => msg.id !== data.id);
      io.emit('delete message', data.id);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      users[socket.id].online = false;
    });
  });
  





  http.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
