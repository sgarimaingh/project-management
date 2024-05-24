const redis = require('redis');

// Redis client
const redisClient = redis.createClient({
    host: 'localhost', 
    port: 6379,        
});

redisClient.on('error', (error) => {
  console.error('Redis client error:', error);
});

module.exports.redisClient = redisClient;