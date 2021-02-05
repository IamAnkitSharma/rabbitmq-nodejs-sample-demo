const amqp = require("amqplib");

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");

        channel.consume("jobs",(data)=>{
            console.log("Received");
            console.log(data.content.toString());
            channel.ack(data);
        });
        console.log("Listening for message..");
       
    } catch (error) {
        console.log(error);
    }
}

connect()