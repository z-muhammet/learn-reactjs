import OpenDetail from "./openDetail";
import React from "react";

export default function FilmCard({ movies, selectedFunc, detailsMovie }) {
  const getMovieGridSpanClass = (index) => {
    const modXl = index % 4;
    const xlClass = {
      0: 'xl:col-span-4', 
      1: 'xl:col-span-3', 
      2: 'xl:col-span-2', 
      3: 'xl:col-span-1'  
    }[modXl];
    
    const modMd = index % 3;
    const mdClass = {
      0: 'md:col-span-3', 
      1: 'md:col-span-2', 
      2: 'md:col-span-1'  
    }[modMd];
    
    const modSm = index % 2;
    const smClass = {
      0: 'sm:col-span-2', 
      1: 'sm:col-span-1'  
    }[modSm];
    
    return `group ${xlClass} ${mdClass} ${smClass}`;
  };

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie, index) => {
          return (
            <React.Fragment key={movie.Id}>
              <div className={`transition-all ${movie.Open ? getMovieGridSpanClass(index) : "group"} animate-in fade-in slide-in-from-right-4 from-opacity-0`} style={{ animationDuration: `${index * 500 + 100}ms` }}>
                <div className="rounded-lg bg-cyan-900/10 border border-neutral-700 overflow-hidden shadow-sm transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover transition-transform duration-500"
                  />
                  <div className="p-3 ">
                    <h6 className="text-sm font-semibold mb-1 line-clamp-1">{movie.Title}</h6>
                    <div className="text-xs text-neutral-400 relative">
                      <span className="left-0">📅 {movie.Year}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 font-semibold text-sm hover:gap-1">
                      <button className=" rounded-none rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none md:rounded-tl-none md:rounded-bl-3xl border border-double border-indigo-300 bg-linear-to-b md:bg-linear-to-r from-violet-200/40 via-pink-200/40 to-rose-300/40 text-[#171d1f] px-3 py-1 transition-all duration-300 hover:from-amber-100/40 hover:to-pink-300/40 hover:text-[#232c2f] hover:scale-105 active:scale-95 shadow-md shadow-violet-400" onClick={() => selectedFunc(movie.Id)}>Add to Watchlist</button>
                      
                      <button className=" rounded-none rounded-bl-3xl rounded-br-3xl md:rounded-bl-none md:rounded-tr-3xl md:rounded-br-none border border-double border-indigo-300 bg-linear-to-t md:bg-linear-to-l from-violet-200/40 via-pink-200/40 to-rose-300/40 text-[#171d1f] px-3 py-1 transition-all duration-300 hover:from-amber-100/40 hover:to-pink-300/40 hover:text-[#232c2f] hover:scale-105 active:scale-95 shadow-md shadow-violet-400" onClick={() => detailsMovie(movie.Id)}>Details</button>
                    </div>
                  </div>
                </div>
              </div>
              {movie.Open && (
                <OpenDetail movie={movie} />
              )}
            </React.Fragment>
          );
        })}
      </div>
  );
}