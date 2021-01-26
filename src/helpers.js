const getStringLettersObject = string => string.split('').reduce((acc, letter) => {
  if (letter in acc) {
    return { ...acc, [letter]: acc[letter] + 1 }
  }
  
  return {
    ...acc,
    [letter]: 1
  }
}, {});

const getLetterCount = (string, regEx) => (string.match(regEx) || []).length;

const getPermutations = array => {
  const length = array.length;
  let result = [array.slice()],
    c = new Array(length).fill(0),
    i = 1, k, p;
  
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      result.push(array.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

const filterArray = (wordsArray, anagramLettersObject) => wordsArray.filter(word => {
  if (word.length < 2) return anagramLettersObject.hasOwnProperty(word)

  const letterArray = word.replace(/'|(.)(?=.*\1)/g, '')

  let letterCheck = true

  for (let key of letterArray) {
    const count = anagramLettersObject[key] ? anagramLettersObject[key] : 0
  
    if (count === 0 || getLetterCount(word, new RegExp(key, 'g')) > count) {
      letterCheck = false
      break
    }
  }

  return letterCheck
});

const sortWordsArray = wordsArray => wordsArray.reduce((acc, word) => {
  const length = word.length
  
  if (acc.hasOwnProperty(length)) {
    const updatedArray = [word].concat(acc[length])
    
    return {
      ...acc,
      [length]: updatedArray
    }
  }
  
  return {
    ...acc,
    [length]: [word]
  }
}, {});

module.exports = {
  getStringLettersObject,
  getLetterOccurrence: getLetterCount,
  getPermutations,
  filterArray,
  sortWordsArray,
}
