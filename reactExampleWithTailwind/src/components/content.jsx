import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {contentItems} from './data';
Content.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  delay: PropTypes.number
}
const createVariants = (reduced) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.96, filter: 'blur(6px)' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: reduced ? 0.25 : 0.45,
      ease: 'easeOut',
      delay: reduced ? 0 : i * 0.07
    }
  }),
  exit: {
    opacity: 0,
    y: reduced ? 0 : -6,
    scale: reduced ? 1 : 0.95,
    filter: 'blur(4px)',
    transition: { duration: reduced ? 0.18 : 0.25, ease: 'easeInOut' }
  }
});
function Content({ item, delay = 0 }) {
  const reduced = useReducedMotion();
  const variants = createVariants(reduced);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="min-h-[220px]">
      <AnimatePresence mode="popLayout">
        {inView && (
          <motion.div
            layout
            custom={delay / 100}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            tabIndex={0}
            role="article"
            aria-label={item.title}
            className="group bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-600 p-6 
                       hover:border-indigo-500 transition-colors duration-300 shadow-sm hover:shadow-md 
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 
                       focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 relative overflow-hidden"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 65%)' }}
          >        
            <h2 className="text-slate-700 dark:text-slate-50 text-2xl font-bold mb-3">{item.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{item.body}</p>
            <motion.img 
              src={item.image} 
              alt={item.title} 
              whileHover={reduced ? {} : { scale: 1.08 }}
              className="w-32 h-32 rounded-lg object-cover border-2 border-slate-200 dark:border-slate-600 
                         group-hover:border-indigo-500 transition-colors duration-300"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                            bg-gradient-to-r from-indigo-600/10 via-transparent to-violet-600/10" />
          </motion.div>
        )}
      </AnimatePresence>
      {!inView && (
        <div className="shimmer rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/40 p-6">
          <div className="h-6 w-2/3 bg-slate-300/70 dark:bg-slate-700/60 rounded mb-4" />
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-slate-300/50 dark:bg-slate-700/50 rounded" />
            <div className="h-4 w-5/6 bg-slate-300/50 dark:bg-slate-700/50 rounded" />
            <div className="h-4 w-4/6 bg-slate-300/50 dark:bg-slate-700/50 rounded" />
          </div>
          <div className="h-32 w-32 bg-slate-300/50 dark:bg-slate-700/50 rounded-lg" />
        </div>
      )}
    </div>
  );
}
ContentList.propTypes = {
  selectedCategory: PropTypes.string
}
export default function ContentList({ selectedCategory }) { 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    // Simulated fetch with latency
    const simulateFetch = () => new Promise(resolve => {
      const latency = 150 + Math.random() * 450; // 150-600ms arası
      setTimeout(() => {
        const filtered = selectedCategory && selectedCategory !== 'Hepsi'
          ? contentItems.filter(item => item.category === selectedCategory)
          : contentItems;
        resolve(filtered);
      }, latency);
    });
    setLoading(true);
    simulateFetch().then(data => {
      if (!active) return;
      setItems(data);
      setLoading(false);
    });
    return () => { active = false; };
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="shimmer rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/40 p-6"
          >
            <div className="h-6 w-2/3 bg-slate-300/70 dark:bg-slate-700/60 rounded mb-4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-slate-300/50 dark:bg-slate-700/50 rounded" />
              <div className="h-4 w-5/6 bg-slate-300/50 dark:bg-slate-700/50 rounded" />
              <div className="h-4 w-4/6 bg-slate-300/50 dark:bg-slate-700/50 rounded" />
            </div>
            <div className="h-32 w-32 bg-slate-300/50 dark:bg-slate-700/50 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid gap-6 grid-cols-1 md:grid-cols-2"
      initial={false}
    >
      <AnimatePresence mode="sync">
        {items.map((item, index) => (
          <Content key={item.title + index} item={item} delay={index * 60} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
