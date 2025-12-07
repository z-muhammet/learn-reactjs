const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

export async function searchMovies(
  query = "", 
  page = 1, 
  includeAdult = false
) {
  if (!apiKey) {
    throw new Error('TMDB API Key is missing.');
  }

  const encodedQuery = encodeURIComponent(query);
  const requestUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodedQuery}&page=${page}&include_adult=${includeAdult}`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`Movie search failed with status: ${response.status}`);
    }
    
    const responseData = await response.json();
    const formattedResults = responseData.results.map((movie) => ({
      Id: movie.id,
      Title: movie.title,
      Details: movie.overview,
      Poster: movie.poster_path!== null ? `${imageBaseUrl}${movie.poster_path}`: 'https://placehold.co/1000x1500/png/?text=No+Image',
      Year: movie.release_date,
    }));
    const totalResults = responseData.total_results;
    const totalPages = responseData.total_pages;
    

    return  {
      results: formattedResults,
      pageSize: totalResults,
      totalPages: totalPages
    };
  } catch (error) {
    console.error('An error occurred while searching movies:', error);
    throw error;
  }
}

export async function detailsMovie(movieId) {
  if (!apiKey) {
    throw new Error('TMDB API Key is missing.');
  }

  const requestUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;

  try {
    const response = await fetch(requestUrl);

    const movie = await response.json();
  
    const directors = movie.credits?.crew
      ?.filter(person => person.job === 'Director')
      .map(person => person.name)
      .join(', ') || '';

    const writers = movie.credits?.crew
      ?.filter(person => ['Screenplay', 'Writer', 'Story'].includes(person.job))
      .map(person => person.name)
      .join(', ') || '';

    const genres = movie.genres?.map(g => g.name).join(', ') || '';
    const score = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;
    const country = movie.production_countries?.[0]?.iso_3166_1 
      ? `(${movie.production_countries[0].iso_3166_1})` 
      : '';
    if (!response.ok) {
      throw new Error(`Fetching movie details failed with status: ${response.status}`);
    }

    return {
      Genres: genres,
      Score: score,             
      Country: country,         
      Duration: movie.runtime || 0,
      Directors: directors, 
      Writers: writers      
      };
  } catch (error) {
    console.error('An error occurred while fetching movie details:', error);
    throw error;
  }
}