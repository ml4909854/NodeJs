
const _ = require('lodash');
console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); // splits an array into groups of a specified value
console.log(_.uniq([1 ,3 ,4, 4,4,4,5])) // removed duplicates values from an array


// object operations
const obj1 = {a:1 , b:2}
const obj2 = {c:3 , d:4}
console.log(_.merge(obj1 , obj2)) // Merges tow objects deeply.

const obj = { a: { b: { c: 3 } } };
console.log(_.get(obj, 'a.b.c', 'default'));

// string manipulation 
console.log(_.capitalize("hello")) // caplitalizes the first letter of the string
console.log(_.kebabCase("Hello World"))  // converts a string to kebab-case this is the required answer

// deboucing and trhotling
// delays the execution of a function until after a specified delay
const log = _.debounce(()=>console.log("called") ,1000)
log()

// _throttle : Ensures a function is called at most once is a specified period
const throt = _.throttle(() => console.log('Throttled!'), 1000);
throt()

// Data filtering and Transformation
// _.filter = Filters elements based on a condition
const users = [{age : 20} , {age:25} , {age:30}]
console.log(_.filter(users, user => user.age > 20));

const numbers = [1, 2, 3];
console.log(_.map(numbers, n => n * 2));