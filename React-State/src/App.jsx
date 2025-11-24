import { dynamicData } from './database/data';
import React, { useEffect, useState, useRef } from 'react';
import MainContent from '../../mainContent';
import Title from './components/title';


function App() {
  console.log("App component rendered");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const didRunRef = useRef(false);
  
  useEffect(() => {
    if (didRunRef.current) return; 
    didRunRef.current = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await dynamicData(5, 1, 1, 1, 1);
        if (result && Array.isArray(result)) {
          setData(result);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error('Data fetching failed:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p>Loading data, please wait...</p>
      </div>
    );
  }

  if (hasError) {
     return (
      <div className="w-full h-full flex items-center justify-center p-4 text-red-500">
        <p>An error occurred while loading the content.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <Title titleText="Dynamic Gallery Title" />
      <MainContent data={data} />
    </div>
  );
}

export default App;