const db = require("../db/database");
const queueWorker = require("./queueWorker");

exports.createEvent = ({ event_type, recipient, data }) => {
    return new Promise((resolve, reject) => {

        const payload = JSON.stringify(data || {});

        db.run(
            `INSERT INTO events (event_type, payload)
             VALUES (?, ?)`,
            [event_type, payload],
            function (err) {

                if (err) {
                    return reject(err);
                }

                const event_id = this.lastID;

                db.run(
                    `INSERT INTO notifications
                    (event_id, recipient, channel, status)
                    VALUES (?, ?, ?, ?)`,
                    [event_id, recipient, "email", "pending"],
                    function (err) {

                        if (err) {
                            return reject(err);
                        }

                        const notification_id = this.lastID;

                        // Push into Queue
                        queueWorker.addToQueue({
                            notification_id,
                            event_id,
                            recipient,
                            channel: "email"
                        });

                        resolve({
                            tracking_id: event_id,
                            notification_id,
                            status: "pending"
                        });

                    }
                );

            }
        );

    });
};