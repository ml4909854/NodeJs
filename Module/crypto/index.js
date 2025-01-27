const crypto = require('crypto');

const hash = crypto.createHash('sha256')
                   .update('Hello, World!')
                   .digest('hex');
console.log(hash);
// Output: A 64-character hexadecimal hash
// 