import PropTypes from 'prop-types';
export default function Header({ onToggleTheme, isDark }) {
  return (
    <nav className="backdrop-blur-md sticky top-0 z-20 border-b 
      bg-white/70 dark:bg-slate-900/80 
      border-slate-200 dark:border-slate-700 
      shadow-sm dark:shadow-none p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
          Logo
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex space-x-8 text-slate-600 dark:text-slate-300">
            {['Home','About','Services','Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={onToggleTheme}
            type="button"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border 
                       border-slate-300 dark:border-slate-700 
                       bg-white/80 dark:bg-slate-800/40 
                       text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-none 
                       hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 
                       hover:text-white hover:border-indigo-500 
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 
                       focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 
                       transition-colors duration-300 text-sm font-medium"
            aria-label="Toggle color theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
                <path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5ZM12 2a1 1 0 0 1 1 1v1.05a9.25 9.25 0 0 1 8.2 8.2H22a1 1 0 1 1 0 2h-1.05a9.25 9.25 0 0 1-8.2 8.2V22a1 1 0 1 1-2 0v-1.05a9.25 9.25 0 0 1-8.2-8.2H2a1 1 0 1 1 0-2h1.05a9.25 9.25 0 0 1 8.2-8.2V3a1 1 0 0 1 1-1Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
                <path d="M21.752 15.002a9.718 9.718 0 0 1-4.986 3.862 9.75 9.75 0 0 1-12.317-12.32 9.716 9.716 0 0 1 3.858-4.99.75.75 0 0 1 1.055.884 8.25 8.25 0 0 0 10.426 10.428.75.75 0 0 1 .964 1.136Z" />
              </svg>
            )}
            <span>{isDark ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired
}