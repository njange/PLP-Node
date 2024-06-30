const axios = require('axios');

const requestHandler = async (req, res) => {
  if (req.url === '/data') { // Assuming you want to fetch data on a specific path, e.g., '/data'
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end('Error fetching data');
    }
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  }
};

module.exports = requestHandler;
