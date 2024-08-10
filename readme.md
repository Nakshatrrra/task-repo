# WebSocket Server with Custom Data

This project sets up a WebSocket server using Node.js and the `ws` library. The server sends custom predefined data to connected clients at specified intervals for order bookings.

## Features

- **WebSocket Server**: Built with Node.js and the `ws` library.
- **Custom Data Transmission**: Sends your choice data updates to clients.
- **Configurable Intervals**: Data updates are sent at different intervals.

## Getting Started

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Nakshatrrra/task-repo
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

### Running the Server

1. **Start the Server**:

    ```bash
    npm start
    ```

    The server will start and listen on port 3000.


Now there are 2 options to open the ws server.
1. **using postman**
2. **using running listener.js**
```bash
    node listener.js
```


2. **Connect Using Postman**:

    - Open Postman.
    - Go to the "WebSocket" section.
    - Connect to `ws://localhost:3000`.
