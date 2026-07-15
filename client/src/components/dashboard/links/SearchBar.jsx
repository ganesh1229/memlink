import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search by alias or URL..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-11 w-full rounded-xl border border-slate-300 pl-11 pr-4 outline-none transition focus:border-blue-500"
        />

      </div>

    </div>
  );
}

export default SearchBar;