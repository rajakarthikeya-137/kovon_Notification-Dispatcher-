require("dotenv").config();

const app = require("./app");

// Initialize Database
require("./db/database");

// Start Queue Worker
require("./services/queueWorker");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});