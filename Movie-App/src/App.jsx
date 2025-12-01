import { useState } from "react";
import  MainContent  from "./components/mainContent";
import  Search  from "./components/search";

const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  },
];

const selected_movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    duration: 120,
    rating: 8.4,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    duration: 125,
    rating: 8.8,
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    duration: 125,
    rating: 8.8,
  },
];

function App() {
  const [movies] = useState(movie_list);
  const [selectedMovies] = useState(selected_movie_list);

  return (
    <div data-bs-theme="dark" className="bg-body text-body min-vh-100">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
        <div className="container-fluid py-2">
          <span className="navbar-brand fw-semibold">Movie App</span>
          <Search />
          <span className="text-secondary">
            <strong className="text-light">{movies.length}</strong> kayıt bulundu.
          </span>
        </div>
      </nav>
      <MainContent movies={movies} selectedMovies={selectedMovies} />      
    </div>
  );
}

export default App;
