## ANAGRAM MATCHER

### The algorithm in short
1. check initial array for duplicates,
2. filter out strings that contain unnecessary chars,
3. sort the result into object of arrays by length of strings,
4. loop through every `object[key]` array looking for matches in `object[anagramLength - key]` array,
5. if match is found, compare all permutations of matching words against provided hashes and print-out 
   the match and update hashes array if hashes match,
6. loop through every `object[key]` array word recursively calling matching function to perform 4-6 steps, 
   where the new anagram is a string that consists of chars that are missing in `object[key]` array word,
   object of arrays of strings is object from step 3 with filtered arrays (as in step 2) and without keys (k) that 
   would not satisfy the condition `k < anagramLength - key` and `object[key]` array word is also passed to be used 
   when calculating permutations,
7. stop searching for matches if all provided hashes have been matched.

### Setup
- `npm install`
- `npm run` to run the algorithm, `npm test` to run tests

### .env Variables

- DATAFILE_PATH - relative path to file within the project with word library.
- MAX_NUMBER_OF_WORDS - max number of words in matched anagrams. Defaults to 3 if omitted.
- MIN_LENGTH_WORD_(ONE|TWO|THREE) - min length of words in array used to start matching
  in respective recursion iteration. If omitted, length is calculated using formula 
  (anagramLength / (MAX_NUMBER_OF_WORDS - selectedWordsCount)) for respective iteration. 
- ANAGRAM - string used to match anagrams.
- HASHES - string of MD5 hashes of anagrams to be matched separated by commas.

### Additional comments

- getPermutations function is based on Heap's method, I found it in stackoverflow.com 
  (https://stackoverflow.com/questions/9960908/permutations-in-javascript#answer-37580979).
- I did not test the main algorithm - index.js and matchAnagram.js - as running it with assignment data and 
  variables is in essence an integration test for it.
- Current arguments in `.env` file (MAX_NUMBER_OF_WORDS=4, MIN_LENGTH_WORD_ONE=8 and 
  MIN_LENGTH_WORD_TWO=4) are optimized for this particular task. I determined them by 
  running the algorithm with MAX_NUMBER_OF_WORDS=4 without MIN_LENGTH params (it takes ~8 
  minutes on my laptop).
  
