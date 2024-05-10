import Redis from 'ioredis';
const { promisify } = require('util');
import HttpStatus from 'http-status-codes';

export const redisClient = new Redis(process.env.REDIS_PORT);

const getAsync = promisify(redisClient.get).bind(redisClient);

export const cache = async (req, res, next) => {
  try {
    
    const cacheData = await getAsync(res.userEmail);

    if (cacheData) {
      console.log('Data fetched from cache');
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Data fetched from cache',
        data: JSON.parse(cacheData)
      });
    } else {
      console.log('Data fetched from database');
      next();
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`,
    });
  }
};