import LinkActions from "./LinkActions";

function LinkRow({
  link,
  onShowQR,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <h3 className="text-lg font-semibold">
            {link.alias}
          </h3>

          <p className="mt-3 text-sm font-medium text-slate-600">
            Original URL
          </p>

          <p className="truncate text-sm text-slate-500">
            {link.originalUrl}
          </p>

          <p className="mt-3 text-sm font-medium text-slate-600">
            Short URL
          </p>

          <p className="truncate text-sm text-blue-600">
            {link.shortUrl}
          </p>

          <div className="mt-4 flex gap-6 text-sm text-slate-500">

            <span>
              <strong>{link.clicks}</strong>{" "}
              Clicks
            </span>

            <span>
              {new Date(
                link.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        <LinkActions
          link={link}
          onShowQR={onShowQR}
        />

      </div>

    </div>
  );
}

export default LinkRow;