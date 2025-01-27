
const printName = (name)=>{
console.log(`my name is ${name}`)
}

const sum = (a , b)=>{
console.log(a+b)
}

const multply = (a , b)=>{
    const args = process.argv.splice(2)
    console.log(args[0] *args[1] *args[2])
}
multply()
//  this is the requires how we are take a values to the input filed
module.exports = {printName , sum}