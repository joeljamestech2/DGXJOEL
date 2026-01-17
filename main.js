const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static folders
app.use("/style", express.static(path.join(__dirname, "style")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/icons", express.static(path.join(__dirname, "icons")));

// Serve index.html
app.get("/joel-xmd-youtube-media-downloader", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
