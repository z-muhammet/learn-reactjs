
export default function SelectedCard({ movies, removeSelectedMovie }) {
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
          {movies.map((movie, index) => (
            <li 
              key={movie.Id} 
              className="px-3 py-3 animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative flex gap-3 items-center transition-all duration-300 cursor-pointer hover:scale-103 hover:bg-neutral-700/30 rounded-md p-1 -m-1">
                <span className=" absolute top-1 right-1 hover:scale-110 transition-transform " onClick={() => removeSelectedMovie(movie.Id)}>
                  <i className="bi bi-x-circle-fill bg-linear-to-r from-yellow-500 via-pink-200 to-sky-200 bg-clip-text text-transparent font-bold text-xl"></i> </span>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-16 h-20 object-cover rounded-md shadow-md transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <h6 className="text-sm font-semibold mb-1 line-clamp-1 transition-colors duration-300">{movie.Title}</h6>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span aria-label="Rating" title="Rating">⭐ {movie.rating}</span>
                    <span aria-label="Duration" title="Duration">⏳ {movie.Duration} dk</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
}
