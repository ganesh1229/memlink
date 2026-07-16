function ReferrerTable({
  referrers,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Top Referrers
      </h2>

      <div className="space-y-4">

        {referrers.length ? (
          referrers.map((item) => (
            <div
              key={item.referrer}
              className="flex items-center justify-between"
            >
              <span>
                {item.referrer}
              </span>

              <span className="font-semibold">
                {item.count}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            No referrer data.
          </p>
        )}

      </div>

    </div>
  );
}

export default ReferrerTable;