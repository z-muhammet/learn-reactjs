import React,{ useState } from "react";
import StarRatingBasic from "./commerce-ui/star-rating-basic";



export default function SelectedCard({ movies, removeSelectedMovie, }) {

  const [movieRating, setMovieRating] = useState(1);
  const updateMovieRating = (movieId, newRating) => {
    movies.find(movie => movie.Id === movieId).rating = newRating;
    setMovieRating(newRating);
    console.log(`1Updated rating for movie ID ${movieId}: ${movieRating}`);
  };

  return (
    <React.Fragment>
      {movies.map((movie, index) => {
        const handleRatingChange = (newRating) => {
          updateMovieRating(movie.Id, newRating);
          console.log(`2New rating for ${movie.Title}: ${newRating}`);
        };

        return (
          <li
            key={movie.Id}
            className="px-3 py-3 animate-in fade-in slide-in-from-right-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative flex gap-3 items-center transition-all duration-300 cursor-pointer hover:scale-103 hover:bg-neutral-700/30 rounded-md p-1 -m-1">
              <span className="absolute top-1 right-1 hover:scale-110 transition-transform" onClick={() => removeSelectedMovie(movie.Id)}>
                <i className="bi bi-x-circle-fill bg-linear-to-r from-yellow-500 via-pink-200 to-sky-200 bg-clip-text text-transparent font-bold text-xl"></i>
              </span>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-16 h-20 object-cover rounded-md shadow-md transition-transform duration-300"
              />
              <div className="flex-1 min-w-0">
                <h6 className="text-sm font-semibold mb-1 line-clamp-1 transition-colors duration-300">{movie.Title}</h6>
                <div className="flex relative justify-between text-xs text-neutral-400 items-center">
                  <span aria-label="Rating" title="Rating"><StarRatingBasic value={movie.rating || 0} onChange={handleRatingChange} maxStars={5}  color="#6f6473" /></span>
                  <span aria-label="Duration" title="Duration">⏳ {movie.Duration} dk</span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </React.Fragment>
  );
}