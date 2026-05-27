import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '9aSdEW0W55yEGPwhljH0mR40AStz7BKZ',
    socket: {
        host: 'vertical-meeting-lunch-59337.db.redis.io',
        port: 15218
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();



await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

