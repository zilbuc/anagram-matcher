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

const time2 = Date.now();

const anagramClean = process.env.ANAGRAM.replace(/[ ']/g, '');

const anagramLettersObject = getStringLettersObject(anagramClean);

const initialArray = file.split(/\r?\n/);
const noDuplicatesArray = initialArray.filter((word, index) =>
  initialArray.indexOf(word.replace(/'/g, '')) === index);

const wordsArrayFiltered = filterArray(noDuplicatesArray, anagramLettersObject);
const wordsObjectSorted = sortWordsArray(wordsArrayFiltered);

const time3 = Date.now();

matchAnagram(anagramClean, wordsObjectSorted, []);

const time4 = Date.now();

console.log('\nSearch complete. Stats in ms:', {
  reading_file_data: time2 - time1,
  initial_data_processing: time3 - time2,
  match_algorithm: time4 - time3,
  total_time: time4 - time1
})
