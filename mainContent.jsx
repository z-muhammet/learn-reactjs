import Detail from './React-State/src/components/detail';
import Galery from './React-State/src/components/gallery';
import { useState } from 'react';


export default function MainContent({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleNextButton = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % data.length);
    console.log("İleri butonuna tıklandı");
  };

  const handleBackButton = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    console.log("Geri butonuna tıklandı");
  };
  
  const images = data[selectedIndex].image1; 
  const details = {
    fullyHistory: data[selectedIndex].Sentence1, 
    description: data[selectedIndex].ShortSentence1,
    photographer: data[selectedIndex].word1,
    title: data[selectedIndex].title
  };

  return (
    <div className="flex flex-1 flex-col-reverse sm:flex-row justify-center">
      <Galery images={images} handleNextButton={handleNextButton} handleBackButton={handleBackButton }/>
      <Detail detailsArray={details} />
    </div>
  );
}