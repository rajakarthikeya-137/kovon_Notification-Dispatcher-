const eventService = require("../services/eventService");

async function createEvent(req, res) {
    console.log("Controller reached");
    console.log(req.body);

    try {
        const { event_type, recipient, data } = req.body;

        if (!event_type || !recipient) {
            return res.status(400).json({
                error: "event_type and recipient are required"
            });
        }

        console.log("Calling service...");

        const result = await eventService.createEvent({
            event_type,
            recipient,
            data
        });

        console.log("Service returned:", result);

        return res.status(202).json({
            message: "Event accepted for processing",
            tracking_id: result.tracking_id,
            notification_id: result.notification_id,
            status: result.status
        });

    } catch (err) {
        console.error("Controller Error:", err);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = { createEvent };