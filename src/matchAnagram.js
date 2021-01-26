const md5 = require('md5');
const {
  filterArray,
  getLetterOccurrence,
  getPermutations,
  getStringLettersObject
} = require('./helpers');

const maxNumberOfWordsInResultString = process.env.MAX_NUMBER_OF_WORDS ?? 3

const customMinWordLengthMatchers = {
  0: process.env.MIN_LENGTH_WORD_ONE ?? 0,
  1: process.env.MIN_LENGTH_WORD_TWO ?? 0,
  2: process.env.MIN_LENGTH_WORD_THREE ?? 0,
}

const hashes = [ ...(process.env.HASHES ? process.env.HASHES.split(',') : []) ]

const matchAnagram = (anagram, wordsObjectSorted, selectedWordsArray) => {
  
  const anagramLength = anagram.length
  const anagramLettersObject = getStringLettersObject(anagram)
  
  const keysOfSortedWordsObject = Object.keys(wordsObjectSorted).map(key => parseInt(key))
  
  const selectedWordsCount = selectedWordsArray.length
  
  const minWordLength = Math.max(
    customMinWordLengthMatchers[selectedWordsCount] ?? 0,
    Math.floor(anagramLength / (maxNumberOfWordsInResultString - selectedWordsCount))
  )
  
  for (let key of keysOfSortedWordsObject) {
    if (key < minWordLength) continue
    
    for (let wordOne of wordsObjectSorted[key]) {
      const missingLettersObject = Object.entries(anagramLettersObject).reduce((acc, [letter, count]) => {
        const countInWordOne = getLetterOccurrence(wordOne, new RegExp(letter, 'g'))
        
        if (countInWordOne === 0) {
          return {
            ...acc,
            [letter]: count
          }
        }
        
        if (count > countInWordOne) {
          return {
            ...acc,
            [letter]: count - countInWordOne
          }
        }
        
        return acc
      }, {})
      
      const missingLettersArray = Object.keys(missingLettersObject)
      
      if (wordsObjectSorted[anagramLength - key]) {
        for (let wordTwo of wordsObjectSorted[anagramLength - key]) {
          let matchCheck = true
          
          for (let letter of missingLettersArray) {
            const countInWordTwo = getLetterOccurrence(wordTwo, new RegExp(letter, 'g'))
            
            if (countInWordTwo !== missingLettersObject[letter]) {
              matchCheck = false
              break
            }
          }
          
          if (matchCheck) {
            const selectedWordsPermutations = getPermutations([...selectedWordsArray, wordOne, wordTwo])
            
            for (let permutation of selectedWordsPermutations) {
              const permutationHash = md5(permutation.join(' '))
              
              for (let hash of hashes) {
                if (hash === permutationHash) {
                  console.log(`found hash ${hash}: `, permutation.join(' '))
                  
                  hashes.splice(hashes.indexOf(hash), 1)
                  break
                }
              }
            }
          }
        }
      }
      
      const updatedSelectedWordsArray = [...selectedWordsArray, wordOne]
      
      if (updatedSelectedWordsArray.length <= maxNumberOfWordsInResultString - 2 && hashes.length !== 0) {
        
        const newAnagram = Object.entries(missingLettersObject)
          .reduce((acc, [letter, count]) => {
            let newString = ''
            for (let i = 0; i < count; i++) {
              newString += letter
            }
            return acc + newString
          }, '')
        
        const newWordsObjectSorted = Object.entries(wordsObjectSorted)
          .reduce((acc, [k, array]) => {
            if (k < anagramLength - key) {
              return {
                ...acc,
                [k]: filterArray(array, missingLettersObject)
              }
            }
            
            return acc
          }, {})
        
        matchAnagram(newAnagram, newWordsObjectSorted, updatedSelectedWordsArray)
      }
    }
  }
}

module.exports = matchAnagram
