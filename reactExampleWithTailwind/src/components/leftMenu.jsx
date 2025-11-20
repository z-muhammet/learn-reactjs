import PropTypes from 'prop-types';
export default function LeftMenu({ onCategoryChange, selectedCategory }) {
  LeftMenu.propTypes = {
    onCategoryChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string,
  };
  const menuItems = ['Hepsi', 'Telefon', 'Kulaklık', 'Saat', 'Tablet', 'Aksesuar'];
  return (
    <nav className="w-full h-full" aria-label="Main menu">
      <h3 className="text-slate-700 dark:text-slate-50 text-lg font-semibold mb-4">Menu</h3>
      <ul className="flex flex-row gap-2 md:flex-col md:gap-3 overflow-x-auto scrollbar-thin">
        {menuItems.map((item, index) => (
          <li key={index} className="flex-shrink-0 md:w-full">
            <button
              type="button"
              onClick={() => onCategoryChange(item)}
              className={`w-auto md:w-full text-left px-4 py-3 rounded-lg select-none
                         ${selectedCategory === item 
                           ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500 shadow' 
                           : 'bg-slate-100/80 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}
                         hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 hover:text-white
                         transition-colors duration-200
                         border hover:border-indigo-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900
                         active:scale-[0.97] text-sm sm:text-base`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}