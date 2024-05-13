import amqp from 'amqplib/callback_api';

const rabbitMQConsumeConfig = {
  consumeMessageFromQueue: () => {
    amqp.connect('amqp://localhost', function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = 'hello';

        channel.assertQueue(queue, {
          durable: false
        });

        channel.consume(queue, function(message) {
          console.log(" [x] Received %s", message.content.toString());
          channel.ack(message);
        }, {
          noAck: false
        });
      });
    });
  }
};

export default rabbitMQConsumeConfig;
