const fs = require('fs');
const readline = require('readline');

// Specify the path to the large file and the word to count
const filePath = '.';
const wordToCount = 'specificWord';

// Initialize the count
let count = 0;

// Create a read stream for the large file
const readStream = fs.createReadStream(filePath);

// Create a readline interface
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break.
});

// Process each line
rl.on('line', (line) => {
  // Split the line into words and count occurrences of the specified word
  line.split(/\s+/).forEach(word => {
    if (word === wordToCount) {
      count++;
    }
  });
});

// When done processing the file, log the count
rl.on('close', () => {
  console.log(`The word "${wordToCount}" occurs ${count} times in the file.`);
});