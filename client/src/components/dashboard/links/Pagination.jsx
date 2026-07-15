function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="rounded-xl border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              onPageChange(i + 1)
            }
            className={`h-10 w-10 rounded-xl transition ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "border hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="rounded-xl border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;