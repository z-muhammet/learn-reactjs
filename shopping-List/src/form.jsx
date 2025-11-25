/* eslint-disable react/prop-types */
import { useState } from 'react';
export default function Form({ ItemSend }) {
  const [name, setName] = useState('');
  const [itemQuantity, setitemQuantity] = useState(1);

  const handleItemSend = (event) => {
    event.preventDefault();

    if(name === '') {
      alert("Lütfen ürün adı giriniz!"); 
      return;
    };

    const newItem = {
      id: Date.now(),
      name: name,
      quantity: itemQuantity,
      completed: false,
    };
    ItemSend(newItem);

    setName('');
    setitemQuantity(1);
  };

  return (
    <form className="form" onSubmit={handleItemSend}>
      <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Ürün adı giriniz" />
      <select value={itemQuantity} onChange={(e) => setitemQuantity(Number(e.target.value))}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <button type="submit">Ekle</button>
    </form >
  );
}