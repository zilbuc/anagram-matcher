const {
  getLetterCount,
  getStringLettersObject,
  getPermutations,
  filterArray,
  sortWordsArray,
} = require('../src/helpers');

describe('Helper methods tests', () => {
  it("should return correct string letters' object of a string", () => {
    const string = "bebe"
    const expectedObject = {
      b: 2,
      e: 2,
    }
    
    const actualObject = getStringLettersObject(string)
    
    expect(actualObject).toEqual(expectedObject)
  })
  
  it("should return correct letters' count of a string", () => {
    const string = 'jadijadida'
    const regEx1 = new RegExp('d', 'g')
    const regEx2 = new RegExp('ž', 'g')
    const expectedCount1 = 3
    const expectedCount2 = 0
    
    const actualCount1 = getLetterCount(string, regEx1)
    const actualCount2 = getLetterCount(string, regEx2)
    
    expect(actualCount1).toEqual(expectedCount1)
    expect(actualCount2).toEqual(expectedCount2)
  })
  
  it("should return correct permutations of an array of strings", () => {
    const stringArray = ['a', 'b', 'c']
    const expectedPermutations = [
      ['a', 'b', 'c'],
      ['a', 'c', 'b'],
      ['b', 'a', 'c'],
      ['b', 'c', 'a'],
      ['c', 'b', 'a'],
      ['c', 'a', 'b'],
    ]
    
    const actualPermutations = getPermutations(stringArray)
    
    expect(actualPermutations.length).toEqual(expectedPermutations.length)
    
    expect(expectedPermutations).toEqual(expect.arrayContaining(actualPermutations))
  })
  
  it("should correctly filter an array of strings", () => {
    const anagram = 'hoot'
    const stringArray = ['a', 'too', 'some', 'hot', 'random', 'to', 'string', 'hoot']
    const expectedFilteredArray = ['too', 'hot', 'to', 'hoot']
    
    const actualFilteredArray = filterArray(stringArray, getStringLettersObject(anagram))
    
    expect(actualFilteredArray.length).toEqual(expectedFilteredArray.length)
    
    expect(expectedFilteredArray).toEqual(expect.arrayContaining(actualFilteredArray))
  })
  
  it("should correctly sort an array of strings", () => {
    const stringArray = ['too', 'some', 'hot', 'random', 'to', 'string', 'hoot']
    const expectedSortedObject = {
      2: ['to'],
      3: ['too', 'hot'],
      4: ['some', 'hoot'],
      6: ['random', 'string']
    }
    
    const actualSortedObject = sortWordsArray(stringArray)
    
    expect(Object.keys(actualSortedObject).length)
      .toEqual(Object.keys(expectedSortedObject).length)

    for (const key of Object.keys(expectedSortedObject)) {
      expect(actualSortedObject[key].length).toEqual(expectedSortedObject[key].length)
      
      expect(expectedSortedObject[key]).toEqual(expect.arrayContaining(actualSortedObject[key]))
    }
  })
})
