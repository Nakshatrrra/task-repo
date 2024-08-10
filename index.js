const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Please add more if u want or use postman ws request.
const customData = [
    { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA" },
    { "AppOrderID": 1111075076, "price": 3, "triggerPrice": 5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANCE" },
    { "AppOrderID": 1111075077, "price": 4, "triggerPrice": 6, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:19", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "TATA" },
    { "AppOrderID": 1111075078, "price": 5, "triggerPrice": 7, "priceType": "LMT", "productType": "I", "status": "cancelled", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:20", "transaction": "sell", "AlgoID": "", "exchange": "NSE", "symbol": "BAJAJ" },
    { "AppOrderID": 1111075079, "price": 6, "triggerPrice": 8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO" },
    { "AppOrderID": 1111075080, "price": 7, "triggerPrice": 9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC" },
    { "AppOrderID": 1111075081, "price": 7, "triggerPrice": 9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC" },
    { "AppOrderID": 1111075082, "price": 7, "triggerPrice": 9, "priceType": "SL-MKT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC" },
    { "AppOrderID": 1111075083, "price": 7, "triggerPrice": 9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC" },
];

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

    sendUpdates(customData.slice(0, 10), 1000); // First 10 updates after 1 second
    sendUpdates(customData.slice(10, 20), 2000);  // Next 10 updates after 2 seconds
    sendUpdates(customData.slice(20, 60), 3000);  // Next 40 updates after 3 seconds
    sendUpdates(customData.slice(60, 90), 3000);  // Last 30 updates after 5 seconds
});

app.get('/', (req, res) => {
    res.send('WebSocket Server is running');
});

server.listen(3000, () => {
    console.log('WebSocket server started on ws://localhost:3000');
});
