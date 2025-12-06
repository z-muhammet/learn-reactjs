import { useState } from "react";
import FilmCard from "./filmCard";
import SelectedCard from "./selectedCard";

export default function MainContent({ movies, selectedMovies, selectedFunc, detailsMovie, removeSelectedMovie }) {
  const [isOpenSelectedCard, setIsOpenSelectedCard] = useState(true);
  const [isOpenFilmCard, setIsOpenFilmCard] = useState(true);
  const rotateButton = (isOpen) => {
    return isOpen
      ? 'transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] rotate-540' 
      : 'transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] rotate-0';
  };
  return (
 
    <main className="max-w-screen-2xl mx-auto my-6 px-4 transition-all duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">  
          <div className="relative mb-4 bg-zinc-200/5 w-full duration-300 hover:scale-y-115 hover:shadow-lg hover:shadow-blue-950/30 hover:cursor-pointer" onClick={()=>{setIsOpenFilmCard(!isOpenFilmCard)}}>
            <span className="p-1 items-center justify-center bg-pink-950/10 border-2 border-pink-200 rounded-b-xl flex top-0 left-0 hover:border-l-0 hover:border-r-0 ">
              <i className={`bi bi-arrow-bar-down ${rotateButton(isOpenFilmCard)} bg-linear-to-r from-yellow-500 via-pink-200 to-sky-200 bg-clip-text text-transparent text-2xl font-extrabold`}>
              </i>
            </span>
          </div>
          <FilmCard movies={isOpenFilmCard ? movies : []} selectedFunc={selectedFunc} detailsMovie={detailsMovie} />
        </div>
        <aside className="sticky top-6 w-full md:w-1/4 self-start">    
          <div className="w-full max-h-[80vh] overflow-y-auto overflow-hidden scroll-smooth no-scrollbar flex flex-col rounded-b-3xl">
            <div className="relative mb-4 bg-zinc-200/5 w-full duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-950/30 hover:cursor-pointer" onClick={()=>{setIsOpenSelectedCard(!isOpenSelectedCard)}}>
              <span className="p-1 items-center justify-center bg-pink-950/10 border-2 border-pink-200 rounded-b-xl flex top-0 left-0 ">
                <i className={`bi bi-arrow-bar-down ${rotateButton(isOpenSelectedCard)} bg-linear-to-r from-yellow-500 via-pink-200 to-sky-200 bg-clip-text text-transparent text-2xl font-extrabold`}>
                </i>
              </span>
            </div>
            <SelectedCard movies={isOpenSelectedCard ? selectedMovies : []} removeSelectedMovie={removeSelectedMovie} />
          </div>
        </aside>
      </div>
    </main>
  );
}