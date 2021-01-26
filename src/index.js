require("dotenv").config();

const fs = require('fs');
const matchAnagram = require('./matchAnagram');
const {
  getStringLettersObject,
  filterArray,
  sortWordsArray,
} = require('./helpers');

if (!process.env.HASHES || !process.env.ANAGRAM || !process.env.DATAFILE_PATH) {
  console.log('Bad input')
  
  return
}

const time1 = Date.now();

const file = fs.readFileSync(process.env.DATAFILE_PATH, 'utf8');

const initialArray = file.split(/\r?\n/);
const noDuplicatesArray = initialArray.filter((word, index) =>
  initialArray.indexOf(word.replace(/'/g, '')) === index);

const anagramClean = process.env.ANAGRAM.replace(/[ ']/g, '');
const anagramLettersObject = getStringLettersObject(anagramClean);

const wordsArrayFiltered = filterArray(noDuplicatesArray, anagramLettersObject);
const wordsObjectSorted = sortWordsArray(wordsArrayFiltered);

const time2 = Date.now();

matchAnagram(anagramClean, wordsObjectSorted, []);

const time3 = Date.now();

console.log('\nSearch complete. Stats in ms:', {
  initial_data_processing: time2 - time1,
  match_algorithm: time3 - time2,
  total_time: time3 - time1
})
