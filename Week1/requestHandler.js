const axios = require('axios');

// Mark the function as async
const requestHandler = async (req, res) => {
  if (req.url === '/data') {
    try {
      // Await for the API call to complete
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
    } catch (error) {
      // Catch and handle any errors
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error fetching data');
    }
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  }
};

module.exports = requestHandler;