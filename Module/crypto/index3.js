const crypto = require("crypto")

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('Sensitive data', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log({ encrypted });
