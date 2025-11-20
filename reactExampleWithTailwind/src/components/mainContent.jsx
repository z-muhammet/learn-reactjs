import { useState } from "react"
import LeftMenu from "./leftMenu"
import ContentList from "./content"

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:py-6">  
      <aside className="w-full lg:w-1/5 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm dark:shadow-none">
        <LeftMenu 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </aside>
      <main className="w-full lg:w-4/5 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-4 lg:p-6 shadow-sm dark:shadow-none">
        <ContentList selectedCategory={selectedCategory} />
      </main>
    </div>
  )
}