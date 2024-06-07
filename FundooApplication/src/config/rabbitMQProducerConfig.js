import amqp from 'amqplib/callback_api';

const rabbitMQProduceConfig = {
  sendMessageToQueue: (msg) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = 'hello';

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log(' [x] Sent %s', msg);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
  }
};

export default rabbitMQProduceConfig;
