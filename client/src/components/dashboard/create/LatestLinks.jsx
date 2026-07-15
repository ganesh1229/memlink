import {
  Copy,
  ExternalLink,
  QrCode,
  Pencil,
  Trash2,
} from "lucide-react";

function LatestLinks({ links = [] }) {
  if (links.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-semibold text-slate-700">
          No links yet
        </h3>

        <p className="mt-2 text-slate-500">
          Your recently created links will appear here.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Latest Links
        </h2>

        <button className="font-semibold text-blue-600 hover:underline">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
          >

            <div>

              <h3 className="font-semibold text-lg">
                {link.alias}
              </h3>

              <p className="text-slate-500">
                {link.shortUrl}
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <Copy size={18} />
              </button>

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <ExternalLink size={18} />
              </button>

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <QrCode size={18} />
              </button>

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <Pencil size={18} />
              </button>

              <button className="rounded-xl p-3 text-red-500 hover:bg-red-50">
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default LatestLinks;