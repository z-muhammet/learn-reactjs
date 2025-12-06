import { useState } from "react";
import MainContent from "./components/mainContent";
import Search from "./components/search";
import AlertModal from "./components/alertModal";
import { useEffect } from "react";

const movie_list = [
  { Id: "769", Title: "GoodFellas", Year: "1990", Duration: 146, Poster: "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", Open: false, Details: "Henry Hill ve arkadaşları New York'ta mafya dünyasına adım atar. Suç, ihanet ve sadakat arasında geçen bu destansı hikaye, organize suçun karanlık yüzünü gözler önüne serer." },
  { Id: "120", Title: "The Lord of the Rings", Year: "2001", Duration: 178, Poster: "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", Open: false, Details: "Hobbit Frodo, Orta Dünya'yı kurtarmak için Tek Yüzük'ü Kader Dağı'na götürmelidir. Dostluk, cesaret ve fedakarlık üzerine kurulu epik bir macera." },
  { Id: "27205", Title: "Inception", Year: "2010", Duration: 148, Poster: "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", Open: false, Details: "Dom Cobb, rüyalara sızarak fikirleri çalan yetenekli bir hırsızdır. Son bir görev için imkansızı başarmalı: bir fikir yerleştirmek." },
  { Id: "105", Title: "Back to the Future", Year: "1985", Duration: 116, Poster: "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg", Open: false, Details: "Marty McFly, çılgın bilim insanı Doc Brown'ın zaman makinesiyle 1955'e gider ve yanlışlıkla anne babasının tanışmasını engeller." },
  { Id: "238", Title: "The Godfather", Year: "1972", Duration: 175, Poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", Open: false, Details: "Don Vito Corleone, Amerika'nın en güçlü mafya ailelerinden birinin başındadır. Oğlu Michael, ailenin karanlık işlerine çekilir." },
  { Id: "550", Title: "Fight Club", Year: "1999", Duration: 139, Poster: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", Open: false, Details: "Uykusuzluk çeken bir adam, sabun satıcısı Tyler Durden ile tanışır ve yeraltı dövüş kulübü kurar. Hiçbir şey göründüğü gibi değildir." },
  { Id: "155", Title: "The Dark Knight", Year: "2008", Duration: 152, Poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg", Open: false, Details: "Batman, Joker'in Gotham'ı kaosa sürüklemesiyle en büyük sınavıyla karşı karşıya kalır. Kahraman mı yoksa kötü adam mı olacak?" },
  { Id: "680", Title: "Pulp Fiction", Year: "1994", Duration: 154, Poster: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", Open: false, Details: "Los Angeles'ın yeraltı dünyasından iç içe geçmiş hikayeler. Gangsterler, boksörler ve gizemli bir çanta etrafında dönen kultürel bir başyapıt." },
  { Id: "13", Title: "Forrest Gump", Year: "1994", Duration: 142, Poster: "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", Open: false, Details: "Düşük IQ'lu ama büyük kalpli Forrest Gump, farkında olmadan Amerikan tarihinin önemli anlarına tanıklık eder ve hayatına dokunan herkesi etkiler." },
  { Id: "424", Title: "Schindler's List", Year: "1993", Duration: 195, Poster: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", Open: false, Details: "İkinci Dünya Savaşı sırasında Alman işadamı Oskar Schindler, 1.100'den fazla Yahudi'yi Holokost'tan kurtarmak için servetini ve hayatını riske atar." },
  { Id: "278", Title: "The Shawshank Redemption", Year: "1994", Duration: 142, Poster: "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", Open: false, Details: "Haksız yere mahkum edilen Andy Dufresne, Shawshank Hapishanesi'nde umut ve dostluk bulur. Özgürlük her şeyin ötesindedir." },
  { Id: "122", Title: "The Matrix", Year: "1999", Duration: 136, Poster: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", Open: false, Details: "Hacker Neo, gerçekliğin bir simülasyon olduğunu keşfeder. Morpheus ve Trinity ile birlikte makinelere karşı savaşa katılır." },
  { Id: "157336", Title: "Interstellar", Year: "2014", Duration: 169, Poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", Open: false, Details: "Dünya ölürken, bir grup astronot insanlığı kurtarmak için solucan deliğinden geçerek yeni bir ev arar. Zaman, uzay ve sevgi sınırları aşar." },
  { Id: "497", Title: "The Green Mile", Year: "1999", Duration: 189, Poster: "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg", Open: false, Details: "1935'te bir idam koğuşunda gardiyan Paul Edgecomb, gizemli güçlere sahip mahkum John Coffey ile tanışır. Mucizeler gerçek olabilir." },
];

const selected_movie_list = [

];

let duplicateMovieData = null;

function App() {
  const [movies, setMovies] = useState(movie_list);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  const [openModal, setOpen] = useState(false);
  
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }
  const detailsMovie = (id) => {
  
    const movie = movies.find(movie => movie.Id === id);
    if (movie) {
      setMovies(movies.map(m => m.Id === id ? { ...m, Open: !movie.Open} : { ...m, Open: false }));
    }
    return movie;
  }

  const addSelectedMovie = (id) => {
    const movie = movies.find(movie => movie.Id === id);
    const duplicate = selectedMovies.find(movie => movie.Id === id);
    
    if (movie && !duplicate) {
      const updatedMovie = { ...movie, Open: true };
      setSelectedMovies([...selectedMovies, updatedMovie]);
    } else if (duplicate) {
      duplicateMovieData = duplicate;  
      handleOpen();
    }
    return movie;
  }

  const removeSelectedMovie = (id) => {
    setSelectedMovies(selectedMovies.filter(movie => movie.Id !== id));
  }

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
      <MainContent movies={movies} selectedMovies={selectedMovies} selectedFunc={addSelectedMovie} detailsMovie={detailsMovie} removeSelectedMovie={removeSelectedMovie} />
      
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
