import { createCustomDataArray } from '../../../creator/dataCreator.js'

export async function dynamicData(itemcount, wordcount, sentencecount, shortsentence, imagecount) {
  const dataArray = await createCustomDataArray({
    itemCount: itemcount,
    wordCount: wordcount,
    sentenceCount: sentencecount,
    shortSentence: shortsentence,
    imageCount: imagecount
  });
  console.log(dataArray);
  console.log("Toplam öğe sayısı:", dataArray.length);
  return dataArray;
}