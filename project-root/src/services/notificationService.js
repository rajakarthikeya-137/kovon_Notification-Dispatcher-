const db = require("../db/database");

exports.updateNotification = (notification_id, status) => {

    return new Promise((resolve, reject) => {

        let query;
        let params;

        if (status === "failed") {

            query = `
            UPDATE notifications
            SET
                status=?,
                retry_count=retry_count+1,
                updated_at=CURRENT_TIMESTAMP
            WHERE id=?`;

            params = [status, notification_id];

        } else {

            query = `
            UPDATE notifications
            SET
                status=?,
                updated_at=CURRENT_TIMESTAMP
            WHERE id=?`;

            params = [status, notification_id];

        }

        db.run(query, params, function (err) {

            if (err) return reject(err);

            resolve();

        });

    });

};