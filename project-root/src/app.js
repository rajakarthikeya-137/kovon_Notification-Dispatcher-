const express = require("express");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid JSON payload"
        });
    }
    next(err);
});

app.get("/", (req, res) => {
    res.json({ message: "API Running" });
});

app.use("/api/v1/events", eventRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

module.exports = app;