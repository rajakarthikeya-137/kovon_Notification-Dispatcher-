const notificationService = require("./notificationService");

const queue = [];

function addToQueue(task) {
    queue.push(task);
}

console.log("Queue Worker Started");

async function processQueue() {

    if (queue.length === 0) return;

    const task = queue.shift();

    console.log(`Processing Notification ${task.notification_id}`);

    const delay = Math.floor(Math.random() * 501) + 500;

    await new Promise(resolve => setTimeout(resolve, delay));

    const failed = Math.random() < 0.1;

    try {

        if (failed) {

            await notificationService.updateNotification(
                task.notification_id,
                "failed"
            );

            console.log(`Notification ${task.notification_id} FAILED`);

        } else {

            await notificationService.updateNotification(
                task.notification_id,
                "completed"
            );

            console.log(`Notification ${task.notification_id} COMPLETED`);

        }

    } catch (err) {

        console.error(err);

    }

}

setInterval(processQueue, 300);

module.exports = {
    addToQueue
};