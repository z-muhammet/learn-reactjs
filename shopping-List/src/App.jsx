/* eslint-disable react/prop-types */
import { useState } from 'react';
import List from "./mainList";

function App() {
  const [completedItem, setCompletedItem] = useState(2); // Başlangıçta 2 tamamlanmış ürün var
  const [totalItems, setTotalItems] = useState(6); // Toplam 6 ürün var
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
      <Form />
      <List Handles={HandleCompletedItem} HandlesLog={HandleLogDeletedItem} />
      <Summary completedItem={completedItem} />
    </div>
  );
}

function Header() {
  return (
    <h1>🛒 Shopping List</h1>
  );
}

function Form() {
  return (
    <form className="form">
      <input type="text" placeholder="Ürün adı giriniz" />
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button type="submit">Ekle</button>
    </form>
  );
}


function Summary({ completedItem }) {
  return (
    <footer className="summary">Alışveriş sepetinizde {completedItem} ürün bulunmaktadır.</footer>
  );
}

export default App