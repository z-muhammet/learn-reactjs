/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import List ,{ addItem} from "./mainList";
import Header from "./Header";
import Form from "./form";
import Summary from "./summary";


function App() {
  const [completedItem, setCompletedItem] = useState(2);
  const [totalItems, setTotalItems] = useState(6);
  const [newItems, setNewItems] = useState([]);

  const AddNewItem = (item) => {
    setNewItems(item);
    setCompletedItem(addItem(item));
    setTotalItems(prevTotal => prevTotal + 1);
  }

  useEffect(() => { console.log("New item added:", newItems); }, [newItems]);

  useEffect(() => { console.log("Current new items state:", newItems); }, [newItems]);

  const HandleCompletedItem = (value) => {
    setCompletedItem(value);
    console.log("Completed items count updated to:", value);
  }

  const HandleLogDeletedItem = (id) => {
    setTotalItems(prevTotal => prevTotal - 1);
    console.log("Item deleted with id:", id, "Remaining items:", totalItems);
  };

  return (
    <div className="app">
      <Header />
      <Form ItemSend={AddNewItem} />
      <List Handles={HandleCompletedItem} HandlesLog={HandleLogDeletedItem} HandlesAddItem={setNewItems} />
      <Summary completedItem={completedItem} totalItems={totalItems} />
    </div>
  );
}


export default App