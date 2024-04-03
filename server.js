const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for sessions and uploaded files
let sessions = {};

// Route to create a new session
app.post("/api/v1/create-session", (req, res) => {
  const sessionId = uuid.v4();
  sessions[sessionId] = { files: [] };
  res.json({ Session_id: sessionId });
});

// Add a route to handle GET requests for creating a session
app.get("/api/v1/create-session", (req, res) => {
  const sessionId = uuid.v4();
  sessions[sessionId] = { files: [] };
  res.json({ Session_id: sessionId });
});

// Route to upload files to a session
app.post("/api/v1/upload-file/:session_id", (req, res) => {
  const sessionId = req.params.session_id;
  const equation = req.body.equation;

  // Check if session exists
  if (!sessions[sessionId]) {
    return res.status(404).json({ error: "Session not found" });
  }

  // Check if max file limit reached
  if (sessions[sessionId].files.length >= 15) {
    // Drop the first uploaded file
    sessions[sessionId].files.shift();
  }

  // Solve equation and add to session files
  const result = eval(equation);
  sessions[sessionId].files.push({ equation, result });

  // Calculate sum of all results
  let sum = 0;
  sessions[sessionId].files.forEach((file) => {
    sum += file.result;
  });

  res.json({ Result: sum });
});

// Route to get session state
app.get("/api/v1/session/:session_id", (req, res) => {
  const sessionId = req.params.session_id;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  // Calculate sum of all results
  let sum = 0;
  session.files.forEach((file) => {
    sum += file.result;
  });

  res.json({ Result: sum });
});

// Route to delete session
app.delete("/api/v1/session/:session_id", (req, res) => {
  const sessionId = req.params.session_id;
  delete sessions[sessionId];
  res.json({ message: "Session deleted successfully" });
});

// Route to delete a file from session
app.delete(
  "/api/v1/session/:session_id/delete-file/:file_index",
  (req, res) => {
    const sessionId = req.params.session_id;
    const fileIndex = req.params.file_index;

    if (!sessions[sessionId]) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (fileIndex < 0 || fileIndex >= sessions[sessionId].files.length) {
      return res.status(404).json({ error: "File not found" });
    }

    sessions[sessionId].files.splice(fileIndex, 1);

    // Recalculate sum of all results
    let sum = 0;
    sessions[sessionId].files.forEach((file) => {
      sum += file.result;
    });

    res.json({ Result: sum });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
