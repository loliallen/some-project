const redis = require('redis')
const config = require('config')
const PORT = config.get('redis_port') || 6379

const client = redis.createClient(PORT)


module.exports = client