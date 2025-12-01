import FilmCard from "./filmCard";
import SelectedCard from "./selectedCard";

export default function MainContent( { movies, selectedMovies }) {
  return (
   <main className="container-xxl my-4">
        <div className="row g-4">
          
          <FilmCard movies={movies} />

          <SelectedCard movies={selectedMovies} />
        </div>
      </main>
  );
}