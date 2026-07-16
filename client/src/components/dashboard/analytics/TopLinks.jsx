function TopLinks({ links }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Top Links
      </h2>

      <div className="space-y-4">

        {links.length ? (
          links.map((link) => (
            <div
              key={link.alias}
              className="flex items-center justify-between"
            >
              <span className="font-medium">
                {link.alias}
              </span>

              <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {link.clicks} clicks
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            No data available.
          </p>
        )}

      </div>

    </div>
  );
}

export default TopLinks;