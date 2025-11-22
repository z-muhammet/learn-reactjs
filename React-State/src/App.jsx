import {dynamicData} from './database/data'
const data = dynamicData(5,2,2,1,1);
function App() {
  console.log(data);
  return (
    <>
      <p>
        React State Management Example
      </p>
    </>
  )
}

export default App
