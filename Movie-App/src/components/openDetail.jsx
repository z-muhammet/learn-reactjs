import { Calendar, Clock, Globe, Star, Clapperboard, PenTool } from 'lucide-react';
import React, { useEffect, useRef } from 'react';



export default function OpenDetail({ movie }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest'
        });
      }, 200);
    }
  }, [movie]);

  const displayDuration = movie.Duration ? `${Math.floor(movie.Duration / 60)}h ${movie.Duration % 60}m` : '';

  return (
    <div ref={cardRef} className="group col-span-full w-full animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="relative flex flex-col md:flex-row overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900/90 shadow-lg transition-all duration-500 hover:shadow-blue-500/10 hover:border-neutral-600">

        <div className="relative w-full md:w-1/3 lg:w-1/4 shrink-0">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-2/3 md:aspect-auto"
          />
          <div className="group-hover:scale-105 duration-700 absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-neutral-900/40"></div>
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8 w-full md:w-2/3 lg:w-3/4">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {movie.Title}
              </h2>
              <div className="flex items-center gap-1.5 rounded-full border border-pink-950/10 bg-linear-to-r from-violet-200/40 via-pink-200/40 to-rose-300/40 px-3 py-1 text-yellow-500 ">
                <Star className="h-4 w-4 fill-yellow-500 " />
                <span className="text-sm font-bold">{movie.Score}%</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                <span>{movie.Year}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-neutral-700"></div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-500" />
                <span>{displayDuration}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-neutral-700"></div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-neutral-500" />
                <span>{movie.Country}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.Genres && movie.Genres.length > 0 ? movie.Genres.map((genre, index) => (
                <span
                  key={index}
                  className="rounded-md border border-indigo-500/20 bg-linear-to-r from-violet-200/40 via-pink-200/40 to-rose-300/40 px-2.5 py-1 text-xs font-medium text-indigo-200 hover:scale-105 duration-150"
                >
                  {genre}
                </span>
              )) : (
                <span className="rounded-md border border-indigo-500/20 bg-linear-to-r from-violet-200/40 via-pink-200/40 to-rose-300/40 px-2.5 py-1 text-xs font-medium text-indigo-200 hover:scale-105 duration-150">
                  No genres
                </span>
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm leading-relaxed text-neutral-300">
              {movie.Details}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
            <div className="flex flex-col gap-1">
              <span className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                <Clapperboard className="h-3 w-3" /> Directors
              </span>
              <span className="text-end rounded-md bg-linear-to-r from-transparent via-pink-200/5 to-rose-300/5 px-2.5 py-1 text-xs font-medium text-indigo-200">
                {movie.Directors && movie.Directors.length > 0 ? movie.Directors : "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                <PenTool className="h-3 w-3" /> Writers
              </span>

              <span className="text-end rounded-md bg-linear-to-r from-transparent via-pink-200/5 to-rose-300/5 px-2.5 py-1 text-xs font-medium text-indigo-200">
                {movie.Writers && movie.Writers.length > 0 ? movie.Writers : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}