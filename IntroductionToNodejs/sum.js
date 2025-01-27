

const sum = ()=>{

    const args = process.argv.splice(2)

    let total = 0
    for(let i = 0 ; i<args.length; i++){
      total+=Number(args[i])
    }
    console.log(total)
}
sum()

// this is the required answer

// check prime number

