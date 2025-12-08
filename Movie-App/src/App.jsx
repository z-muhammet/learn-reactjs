import { useState } from "react";
import MainContent from "./components/mainContent";
import Search from "./components/search";
import AlertModal from "./components/alertModal";
import { useEffect } from "react";
import { searchMovies, detailsMovie } from "./fetchApi";
import { Flag } from "lucide-react";


const selected_movie_list = [];
const movie_list = [];
const existingIds = new Set();

let duplicateMovieData = null;
let totalMovies = 0;
let totalPages = 0;

const paginationMaps = new Map();

function App() {
  const [movies, setMovies] = useState(movie_list);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  const [openModal, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      setSelectedMovies([updatedMovie, ...selectedMovies]);
    } else if (duplicate) {
      duplicateMovieData = duplicate;
      handleOpen();
    }
    return movie;
  }

  const removeSelectedMovie = (id) => {
    setSelectedMovies(selectedMovies.filter(movie => movie.Id !== id));
  }

  const fetchMovies = async (query, signal) => {
    try {
      const data = await searchMovies(query, signal);
      if (data) {
        setMovies(data.results);
        totalMovies = data.pageSize;
        if (totalMovies % 12 === 0) {
          totalPages = totalMovies / 12
        } else { totalPages = Math.floor(totalMovies / 12) + 1 }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  const fetchMoviesPage = async (query, signal, pageNumber,Flag = false) => {
    let nextPageNumber = pageNumber;
    if (!false) nextPageNumber -= 1;
    const clearData = [];
    if (pageNumber > (totalMovies / 20)) return [];
    try {
      const data = await searchMovies(query, signal, pageNumber);
      if (data) {
        console.log("fmp:1", data.results);
        data.results.forEach(movie => {
          if (!existingIds.has(movie.Id)) {
            existingIds.add(movie.Id);
            clearData.push(movie);
          }
        });
        console.log(`Fetched page data for query "${query}":`, clearData);

        if (clearData.length === 0) {
          console.warn(`Sayfa ${pageNumber} duplicate, sonraki sayfaya geçiliyor...`);
          if (nextPageNumber <= 0||Flag){ nextPageNumber = pageNumber + 1;Flag = true;}
          return fetchMoviesPage(query, signal, nextPageNumber,Flag);
        }

        return clearData;
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching movies:', error);
      }
    }
    return [];
  }

  const distributeMoviesToPages = (moviesToDistribute, targetPageNumber) => {
    const nextPageNumber = (targetPageNumber + 1) % totalPages || totalPages;

    if (!moviesToDistribute || moviesToDistribute.length === 0) {
      return;
    }

    const currentMoviesOnPage = paginationMaps.get(targetPageNumber) || [];

    const safeCurrentMovies = Array.isArray(currentMoviesOnPage) ? currentMoviesOnPage : [];

    const availableSpace = 12 - safeCurrentMovies.length;

    if (availableSpace <= 0) {
      distributeMoviesToPages(moviesToDistribute, nextPageNumber);
      return;
    }

    const moviesFittingInPage = moviesToDistribute.slice(0, availableSpace);
    const remainingMovies = moviesToDistribute.slice(availableSpace);
    paginationMaps.set(targetPageNumber, [...safeCurrentMovies, ...moviesFittingInPage]);

    if (remainingMovies.length > 0) {
      distributeMoviesToPages(remainingMovies, nextPageNumber);
    }
  };


  const paginateMovies = async (pageNumber) => {
    console.log(`Checking Page: ${pageNumber}`);
    const _pageNumber = Math.ceil((pageNumber * 12) / 20);

    if (pageNumber < 1 || (totalPages && pageNumber > totalPages)) return;

    const cachedData = paginationMaps.get(pageNumber);
    if (Array.isArray(cachedData) && cachedData.length === 12) {
      setMovies([...cachedData]);
      return;
    }
    try {
      let fetchResponse = await fetchMoviesPage(searchQuery, null, _pageNumber);
      if (fetchResponse && Array.isArray(fetchResponse)) {

        console.log(`API: ${fetchResponse.length} geldi.`);

        if (fetchResponse.length > 0) {
          distributeMoviesToPages(fetchResponse, pageNumber);
          console.log(`Dağıtım tamamlandı. Sayfa haritası:`, paginationMaps);
        }

        const finalPageData = paginationMaps.get(pageNumber) || [];
        setMovies(finalPageData);

      } else {
        console.warn(`Sayfa ${pageNumber} için API formatı hatalı veya veri yok.`);
      }
    } catch (error) {
      console.error("paginateMovies Hatası:", error);
    }
  };

  useEffect(() => {
    fetchMovies("Matrix");
  }, []);

  useEffect(() => {
    console.log("Selected movies:", selectedMovies);
  }, [selectedMovies]);

  useEffect(() => {
    console.log("Movies:", movies);
  }, [movies]);

  useEffect(() => {
    const controller = new AbortController();

    if (!searchQuery) return;

    const searchDelayed = setTimeout(() => {
      fetchMovies(searchQuery, controller.signal);
      existingIds.clear();
      paginationMaps.clear();
    }, 800);
    return () => { controller.abort(); clearTimeout(searchDelayed) };

  }, [searchQuery]);


  return (
    <div className="min-h-full bg-neutral-900 text-neutral-100">
      <nav className="relative top-0 z-10 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-wide">Movie App</span>
          <Search setSearchQuery={setSearchQuery} />
          <span className="sm:ml-auto text-xs sm:text-sm text-neutral-400">
            <strong className="text-white font-bold">{totalMovies}</strong> kayıt bulundu.
          </span>
        </div>
      </nav>
      <MainContent movies={movies} selectedMovies={selectedMovies} selectedFunc={addSelectedMovie} detailsMovie={detailsFetchMovie} removeSelectedMovie={removeSelectedMovie} />
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => paginateMovies(index + 1)} className="
            rounded-full border border-double border-indigo-300 bg-linear-to-b from-violet-200/40 via-pink-200/40 to-rose-300/40 text-[#171d1f] px-3 py-1 transition-all duration-300 hover:from-amber-100/40 hover:to-pink-300/40 hover:text-[#232c2f] hover:scale-105 active:scale-95 shadow-md shadow-violet-400
          ">
            {index + 1}
          </button>
        ))}
      </div>

      <AlertModal open={openModal} handleClose={handleClose} title="Uyarı" message={duplicateMovieData ? `${duplicateMovieData.Title} zaten seçilenler listesinde bulunuyor.` : "Bu film zaten listede mevcut!"} />
    </div>
  );
}

export default App;
