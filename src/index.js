// Import required modules
const Moralis = require("moralis").default;
const http = require('http');
const app = require('./app');

// Load environment variables
const web3_api_key = process.env.WEB3_API_KEY;
const port = process.env.PORT || 8080;

// Function to start the server and initialize Moralis
const startServer = async () => {
  try {
    // Initialize Moralis
    await Moralis.start({
      apiKey: web3_api_key,
    });
    console.log('Moralis initialized successfully');

    // Create HTTP server
    const server = http.createServer(app);

    // Set max listeners to prevent memory leaks
    process.setMaxListeners(0);

    // Start the server
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server
startServer();
