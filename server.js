const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the resume PDF
app.get('/resume.pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'resume.pdf'));
});

// The "catchall" handler: for any request that doesn't
// match an API route, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
