// I'll mention all the assumptions I've made in the code comments according to the docs that you provided.
//  this comments are not ai generated and written by me.
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

const orders = new Map();
let pendingUpdates = [];
let actionTimer = null;

const determineAction = (order) => {
  const { priceType, status } = order;
  const exists = orders.has(order.AppOrderID);

  if (priceType === 'MKT' && status === 'complete' && !exists) {
    return 'placeOrder';
  }
  if (priceType === 'LMT' && status === 'open' && !exists) {
    return 'placeOrder';
  }
  if (['SL-LMT', 'SL-MKT'].includes(priceType) && status === 'pending' && !exists) {
    return 'placeOrder';
  }
  if (priceType === 'MKT' && status === 'complete' && exists) {
    return 'modifyOrder';
  }
  if (priceType === 'LMT' && status === 'open' && exists) {
    return 'modifyOrder';
  }
  if (['SL-LMT', 'SL-MKT'].includes(priceType) && status === 'pending' && exists) {
    return 'modifyOrder';
  }
  if (['LMT', 'SL-LMT', 'SL-MKT'].includes(priceType) && status === 'cancelled') {
    return 'cancelOrder';
  }
  return null;
};

const processUpdates = () => {
  if (pendingUpdates.length > 0) {
    const update = pendingUpdates[0]; // here i'll accept the first order only and neglect others
    console.log(`Sending aggregated update: ${JSON.stringify(update)}`);
    pendingUpdates = [];
  }
};

ws.on('message', (data) => {
  const order = JSON.parse(data);
  const { AppOrderID } = order;

  if (orders.has(AppOrderID)) {
    console.log(`Duplicate update filtered: ${JSON.stringify(order)}`);
    return;
  }

  orders.set(AppOrderID, order);

  const action = determineAction(order);
  if (action) {
    console.log(`Action determined: ${action} for order ${AppOrderID}`);
  }

  // Aggregation
  pendingUpdates.push(order);
  if (actionTimer) {
    clearTimeout(actionTimer);
  }
  actionTimer = setTimeout(processUpdates, 1000); // I've set 1 second limit as per documentation
});

ws.on('open', () => {
  console.log('Connected to WebSocket server');
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
