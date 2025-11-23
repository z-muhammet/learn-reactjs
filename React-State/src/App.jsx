// import {dynamicData} from './database/data'
// const data = dynamicData(5,2,2,1,1);
import React from 'react';
import MainContent from './components/mainContent';
import Title from './components/title';

function App() {
  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <Title TitleText="Dynamic Gallery Title" />
      <MainContent />
    </div>
  )
}

export default App
