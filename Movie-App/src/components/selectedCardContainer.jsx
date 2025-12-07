import SelectedCard from "./selectedCard";  

export default function SelectedCardContainer({ movies, isOpenCard=true, removeSelectedMovie }) {
  return (
      <div className="sticky top-4 rounded-lg bg-neutral-800 border border-neutral-700 shadow-sm transition-all duration-500">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
          <span className="font-semibold text-sm">Seçilenler</span>
          <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-300">
            {movies.length}
          </span><span className="bg-yellow-500 text-black text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-300">
           ortalama süre: {movies.length > 0 ? (movies.reduce((total, movie) => total + movie.Duration, 0) / movies.length).toFixed(1): 0} dk 
          </span>
        </div>
        <ul className="divide-y divide-neutral-700">
          <SelectedCard movies={isOpenCard ? movies : []} removeSelectedMovie={removeSelectedMovie} className="flex-col-reverse"/>
        </ul>
      </div>
  );
}
