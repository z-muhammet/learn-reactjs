export default function FilmCard({ movies }) {
  return (
    <div className="col-12 col-md-9">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
              {movies.map((movie) => (
                <div className="col " key={movie.Id}>
                  <div className="card bg-body-tertiary text-light border-0 h-100 transition duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="card-img-top"
                    />
                    <div className="card-body ">
                      <h6 className="card-title mb-2">{movie.Title}</h6>
                      <div className="small text-secondary">
                        <i className="bi bi-calendar2-date me-1"></i>
                        <span>{movie.Year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  );
}