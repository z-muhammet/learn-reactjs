import { useState } from "react";
import MainContent from "./components/mainContent";
import Search from "./components/search";
import AlertModal from "./components/alertModal";
import { useEffect } from "react";
import { searchMovies, detailsMovie} from "./fetchApi";


const selected_movie_list = [];
const movie_list = [];

let duplicateMovieData = null;

function App() {
  const [movies, setMovies] = useState(movie_list);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  const [openModal, setOpen] = useState(false);

  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }
  
  const detailsFetchMovie = async (id) => {
    const tickMovie = movies.find(m => m.Id === id);
    
    if (tickMovie && tickMovie.Open) {
      setMovies(prevMovies => prevMovies.map(m => ({ ...m, Open: false })));
      return;
    }

    if (tickMovie && tickMovie.Genres) {
      setMovies(prevMovies => prevMovies.map(m => ({
        ...m, 
        Open: m.Id === id ? true : false
      })));
      return;
    }

    try {
      console.log(`🎬 Detaylar çekiliyor: ${tickMovie?.Title}`);
      const details = await detailsMovie(id); 
      setMovies(prevMovies => prevMovies.map(m => {
        if (m.Id === id) {
          return { ...m, ...details, Open: true };
        }
        return { ...m, Open: false };
      }));
      console.log(`✅ Detaylar çekildi:`, details);
      
    } catch (error) {
      console.error("Detaylar çekilemedi:", error);
    }
  }

  const addSelectedMovie = (id) => {
    const movie = movies.find(movie => movie.Id === id);
    const duplicate = selectedMovies.find(movie => movie.Id === id);
    
    if (movie && !duplicate) {
      const updatedMovie = { ...movie, rating: 3 };
      setSelectedMovies([updatedMovie,...selectedMovies]);
    } else if (duplicate) {
      duplicateMovieData = duplicate;  
      handleOpen();
    }
    return movie;
  }

  const removeSelectedMovie = (id) => {
    setSelectedMovies(selectedMovies.filter(movie => movie.Id !== id));
  }

  const fetchMovies = async (query) => {
    try {
      const data = await searchMovies(query);
      setMovies(data.results); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  useEffect(() => {
    fetchMovies("Matrix");
  }, []); 

  useEffect(() => {
    console.log("Selected movies:", selectedMovies);
  }, [selectedMovies]);

  useEffect(() => {
    console.log("Movies:", movies);
  }, [movies]);


  return (
    <div className="min-h-full bg-neutral-900 text-neutral-100">
      <nav className="relative top-0 z-10 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-wide">Movie App</span>
          <Search />
          <span className="sm:ml-auto text-xs sm:text-sm text-neutral-400">
            <strong className="text-white font-bold">{movies.length}</strong> kayıt bulundu.
          </span>
        </div>
      </nav>
      <MainContent movies={movies} selectedMovies={selectedMovies} selectedFunc={addSelectedMovie} detailsMovie={detailsFetchMovie} removeSelectedMovie={removeSelectedMovie} />
      
      <AlertModal
        open={openModal}
        handleClose={handleClose}
        title="Uyarı"
        message={duplicateMovieData ? `${duplicateMovieData.Title} zaten seçilenler listesinde bulunuyor.` : "Bu film zaten listede mevcut!"}
      />
    </div>
  );
}

export default App;
