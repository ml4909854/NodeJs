const prime = () => {
    const args = process.argv.splice(2);
    let num = Number(args[0]);
  
    if (num <= 1) {
      console.log("NO, it is not a prime number");
      return;
    }
  
    
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
  
    if (isPrime) {
      console.log("It is a prime number");
    } else {
      console.log("NO, it is not a prime number");
    }
  };
  
  prime();
  