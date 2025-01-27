const os = require("os")

// system information return the os type linux , darwin , or windows_NT
console.log(os.type())

// return the platform win32 , linux or darwin
console.log(os.platform())

// returns the CPU architecture eg x64 arm
console.log(os.arch())
console.log(os.totalmem())
console.log(os.freemem())
