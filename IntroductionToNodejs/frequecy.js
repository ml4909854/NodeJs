const word = () => {
  const args = process.argv.splice(2);

  let wordFrequecy = {};
  for (let i = 0; i < args.length; i++) {
    const word = args[i].toLowerCase();
    if (wordFrequecy[word]) {
      wordFrequecy[word]++;
    }
    else{
        wordFrequecy[word] = 1
    }
  }
  console.log(wordFrequecy)
};

word();
