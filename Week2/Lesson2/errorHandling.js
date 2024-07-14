const fs = require('fs');
const axios = require('axios');
const { Client } = require('pg');
const util = require('util');

const debuglog = util.debuglog('app');

// Function to read configuration file
function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile('./config.json', 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Error reading configuration file'));
      } else {
        try {
          const config = JSON.parse(data);
          resolve(config);
        } catch (parseErr) {
          reject(new Error('Error parsing configuration file'));
        }
      }
    });
  });
}

// Function to connect to the database
async function connectToDatabase(dbConfig) {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    debuglog('Connected to database');
    return client;
  } catch (err) {
    throw new Error('Database connection error');
  }
}

// Function to fetch data from an API
async function fetchDataFromApi(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    debuglog('Data fetched from API');
    return response.data;
  } catch (err) {
    throw new Error('API fetch error');
  }
}

// Main function to orchestrate operations
async function main() {
  try {
    const config = await readConfig();
    const dbClient = await connectToDatabase(config.database);
    const apiData = await fetchDataFromApi(config.api.url);
    console.log(apiData);
    // Perform further operations with dbClient and apiData
    await dbClient.end();
  } catch (err) {
    console.error(err.message);
  }
}

main();