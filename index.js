const mqtt = require('mqtt'); // require mqtt
const { Client } = require('@elastic/elasticsearch');

const eClient = new Client(
    {
        node: 'https://15c39a4c758e45eabc6234aeaf5adc3d.eu-west-1.aws.found.io:9243',
        auth: { username: 'elastic', password: 'uCOMg205evb8SIoWMUQvwl70' }
    });

const mClient = mqtt.connect('franciscogubbins.me', {
    port: 1883,
    protocol: 'mqtt',
    host: 'franciscogubbins.me'
});
mClient.subscribe('#');

mClient.on('connect', () => {
    console.log('Connected');
});

mClient.on('disconnect', () => { mClient.reconnect() });

mClient.on('message', (topic, payload, packet) => {
    eClient.index({
        index: 'mqtt-index-2',
        body: {
            topic,
            value: parseInt(String(payload)),
            date: Date.now()
        }
    });
});