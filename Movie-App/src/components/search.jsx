export default function Search(setSearchQuery) {
  return (
    <form className="flex grow mx-3 max-w-md w-full sm:w-auto">
      <div className="flex w-full items-center gap-2 rounded-full border border-neutral-600 bg-neutral-800 px-3 sm:px-4 py-2 transition focus-within:border-neutral-400">
        <span className="text-neutral-400" aria-hidden>🔍</span>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-neutral-100 placeholder-neutral-500 text-sm"
          placeholder="Film ara..."
          onChange={(e) => setSearchQuery.setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
}