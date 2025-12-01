export default function SelectedCard({ movies }) {
  return (
    <div className="col-12 col-md-3">
            <div className="card bg-body-tertiary text-light border-0 shadow-sm sticky-top">
              <div className="card-header bg-transparent border-secondary d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Seçilenler</span>
                <span className="badge text-bg-warning">{movies.length}</span>
              </div>

              <ul className="list-group list-group-flush">
                {movies.map((movie) => (
                  <li
                    key={movie.Id}
                    className="list-group-item bg-transparent border-secondary"
                  >
                    <div className="row g-2 align-items-center transition duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                      <div className="col-4">
                        <img
                          src={movie.Poster}
                          alt={movie.Title}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-8">
                        <h6 className="mb-1">{movie.Title}</h6>
                        <div className="d-flex justify-content-between small text-secondary">
                          <span>
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            {movie.rating}
                          </span>
                          <span>
                            <i className="bi bi-hourglass text-warning me-1"></i>
                            {movie.duration} dk
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  );
}
