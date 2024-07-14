const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'demoDir');
const fileCount = 5;
const filesToDelete = [];

// Step 1: Create a directory
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) return console.error('Error creating directory:', err);
  console.log('Directory created.');

  // Step 2: Create multiple files with random content
  for (let i = 0; i < fileCount; i++) {
    const filePath = path.join(dirPath, `file${i}.txt`);
    const content = `Random Content ${Math.random()}`;
    fs.writeFile(filePath, content, (err) => {
      if (err) return console.error('Error writing file:', err);
      console.log(`${filePath} created.`);

      // Step 3: Read and display the content of each file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.error('Error reading file:', err);
        console.log(`Content of ${filePath}: ${data}`);

        // Step 4: Delete specific files based on a condition
        // Example condition: Delete if file content includes '5'
        if (data.includes('5')) filesToDelete.push(filePath);

        // Delete files after all have been read
        if (filesToDelete.length === fileCount) {
          filesToDelete.forEach((fileToDelete) => {
            fs.unlink(fileToDelete, (err) => {
              if (err) return console.error('Error deleting file:', err);
              console.log(`${fileToDelete} deleted.`);
            });
          });
        }
      });
    });
  }
});