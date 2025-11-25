import PropTypes from 'prop-types';

export default function Summary({ completedItem , totalItems}) {
  return (
    <footer className="summary">Alışveriş sepetinizdeki {totalItems} üründen {completedItem} adetini aldınız.</footer>
  );
}

Summary.propTypes = {
  completedItem: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};