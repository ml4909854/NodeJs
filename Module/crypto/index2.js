const crypto = require("crypto")

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.createHmac('sha256', salt)
                   .update('password123')
                   .digest('hex');
console.log({ salt, hash });
