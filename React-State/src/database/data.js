import { createCustomDataArray } from '../../../creator/dataCreator.js'

export function dynamicData(itemcount, wordcount, sentencecount, shortsentence, imagecount) {
   createCustomDataArray({
    itemCount: itemcount,
    wordCount: wordcount,
    sentenceCount: sentencecount,
    shortSentence: shortsentence,
    imageCount: imagecount
  }).then((data) => {
    console.log(data)
  })
}