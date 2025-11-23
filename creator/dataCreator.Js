
import { imageCreators } from './imageCreator.js';
const generateRandomText = wordCount => {
  const apiUrl = `https://random-word-api.vercel.app/api?words=${wordCount}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.join(' '));
};
const generateDescription = sentenceCount => {
  const apiUrl = `https://baconipsum.com/api/?type=all-meat&sentences=${sentenceCount}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data[0]);
};


export async function createCustomDataArray({
  itemCount = 1,
  wordCount = 1,
  sentenceCount = 1,
  shortSentence = 1,
  imageCount = 0,
}) {
  const customList = [];


  for (let i = 0; i < itemCount; i++) {
    const title = await generateRandomText(1);
    const dataSpecs = [
      {
        prefix: 'word',
        count: wordCount,
        generator: () => generateRandomText(2)
      },
      {
        prefix: 'Sentence',
        count: sentenceCount,
        generator: () => generateDescription(1),
      },
      {
        prefix: 'ShortSentence',
        count: shortSentence,
        generator: () => generateRandomText(3)
      },
      {
        prefix: 'image',
        count: imageCount,
        generator: async () => {
          const imgUrl = await imageCreators(title);
          return imgUrl;
        }
      }
    ];

    const customItem = { title };

    for (const spec of dataSpecs) {
      for (let j = 1; j <= spec.count; j++) {
        const key = `${spec.prefix}${j}`;
        customItem[key] = await spec.generator();
      }
    }
    customList.push(customItem);
  }

  return customList;
}


