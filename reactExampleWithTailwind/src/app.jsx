import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainSection from './components/mainContent';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsDark(false);
    } else if (stored === 'dark') {
      setIsDark(true);
    }
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(d => !d);

  return (
  <div className='relative w-full flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300'>
      {isDark && (
        <>
          <div className="fixed top-20 left-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="fixed bottom-20 right-20 w-96 h-96 bg-violet-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        </>
      )}
      <div className="relative z-10 px-4">
        <Header onToggleTheme={toggleTheme} isDark={isDark} />
        <MainSection />
      </div>
    </div>
  )
}