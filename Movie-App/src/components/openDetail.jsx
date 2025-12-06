
export default function OpenDetail({ movie }) {
  return (
    <div className="group col-span-full animate-in fade-in slide-in-from-top-4 duration-700"> 
        <div className="h-full rounded-lg bg-blue-950/10 border border-neutral-700 overflow-hidden shadow-sm transition-all duration-500 cursor-pointer group-hover:scale-[1.01] group-hover:shadow-lg group-hover:shadow-blue-500/30 flex flex-row">
            <img 
             src={movie.Poster}
             alt={movie.Title}
             className="aspect-video w-1/3 object-cover transition-transform duration-500"/>
            <div className="p-3 w-2/3">
                <h6 className="text-sm font-semibold mb-1 transition-colors duration-300">{movie.Title}</h6>
                <div className="text-xs text-neutral-400 flex items-center gap-1 transition-opacity duration-300">
                    <span aria-hidden="true">📅</span><span>{movie.year}</span>
                </div>
                <p className="text-xs text-neutral-300 mt-2 transition-opacity duration-500 delay-100">{movie.Details}</p>
            </div>
        </div>
    </div>
  )
}