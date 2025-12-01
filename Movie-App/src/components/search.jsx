export default function Search() {
  return (
    <form className="d-flex flex-grow-1 mx-3">
      <div className="input-group rounded-pill border border-secondary overflow-hidden">
        <span className="input-group-text bg-transparent border-0 text-secondary">
          <i className="bi bi-search" />
        </span>
        <input
          type="text"
          className="form-control bg-transparent border-0 text-light"
          placeholder="Film ara..."
        />
      </div>
    </form>
  );
}