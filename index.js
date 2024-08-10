const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const generateOrderUpdate = (id) => ({
  AppOrderID: id,
  price: Math.random() * 100,
  triggerPrice: Math.random() * 100,
  priceType: ['MKT', 'LMT', 'SL-LMT', 'SL-MKT'][Math.floor(Math.random() * 4)],
  productType: 'STK',
  status: ['open', 'complete', 'pending', 'cancelled'][Math.floor(Math.random() * 4)],
  exchange: 'NYSE',
  symbol: 'AAPL',
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendUpdates = (updates, delay) => {
    setTimeout(() => {
      updates.forEach(update => {
        ws.send(JSON.stringify(update));
        console.log(`Sent order update: ${JSON.stringify(update)} at ${new Date().toISOString()}`);
      });
    }, delay);
  };

  // First 10 updates in 1 second by slicing array
  sendUpdates(Array.from({ length: 10 }, (_, i) => generateOrderUpdate(i)), 1000);

  // Next 20 updates after 2 seconds same
  sendUpdates(Array.from({ length: 20 }, (_, i) => generateOrderUpdate(i + 10)), 3000);

  // 40 updates after 3 seconds same
  sendUpdates(Array.from({ length: 40 }, (_, i) => generateOrderUpdate(i + 30)), 6000);

  // Final 30 updates after 5 seconds same
  sendUpdates(Array.from({ length: 30 }, (_, i) => generateOrderUpdate(i + 70)), 11000);
});

app.get('/', (req, res) => {
  res.send('WebSocket Server is running');
});

server.listen(3000, () => {
  console.log('WebSocket server started on ws://localhost:3000');
});
