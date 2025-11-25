/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

let items = [
  { id: 1, name: 'Yumurta', quantity: 12, completed: true, },
  { id: 2, name: 'Süt', quantity: 2, completed: false, },
  { id: 3, name: 'Ekmek', quantity: 1, completed: false, },
  { id: 4, name: 'Peynir', quantity: 1, completed: true, },
  { id: 5, name: 'Domates', quantity: 4, completed: false, },
  { id: 6, name: 'salatalık', quantity: 6, completed: false, },
];
let completedItemsCount = items.filter(item => item.completed).length;

export function addItem(newItem) {
  items.push(newItem);
  completedItemsCount = items.filter(item => item.completed).length;
  return completedItemsCount;
}

export default function List({ Handles, HandlesLog }) {

  return (
    <div className="list">
      <ul>
        {items.map((item) => (<Item item={item} key={item.id} Handles={Handles} deleteItems={HandlesLog} />))}
      </ul>
    </div>
  );
}

function Item({ item, Handles, deleteItems }) {
  const deleteItem = (e) => {
    e.stopPropagation(); // Li'nin onClick'ini tetikleme
    items = items.filter(itm => itm.id !== item.id);
    completedItemsCount = items.filter(is => is.completed).length;
    Handles(completedItemsCount);
    console.log("Delete button clicked for item with id:", item.id);
    item.checked = false;
    deleteItems(item.id);
  };

  const handleCheckChange = () => {
    items[items.findIndex(itm => itm.id === item.id)].completed = !items[items.findIndex(itm => itm.id === item.id)].completed;
    console.log("Checkbox changed for item with id:", item.id);
    console.log("New isChecked value:", item.completed);
    completedItemsCount = items.filter(is => is.completed).length;
    Handles(completedItemsCount);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation(); 
    handleCheckChange();
  };

  return (
    <li className={item.completed ? 'completed' : ''} onClick={handleCheckChange}>
      <input type="checkbox" checked={item.completed} readOnly onClick={handleCheckboxClick} />
      <span className="item-name">{item.name} | </span>
      <span className="item-quantity">({item.quantity})</span>
      <button className="delete-button" onClick={deleteItem}>❌</button>
    </li>
  );
}

List.propTypes = {
  Handles: PropTypes.func.isRequired,
  HandlesLog: PropTypes.func.isRequired,
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  Handles: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired,
};
