const amqp = require("amqplib");

const data = {"name":process.argv[2]}
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(data)))
        console.log('Job Sent Succesfully - '+data.name);
    } catch (error) {
        console.log(error);
    }
}

connect()