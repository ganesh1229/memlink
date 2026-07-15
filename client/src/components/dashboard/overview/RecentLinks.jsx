import { ExternalLink, Copy } from "lucide-react";

function RecentLinks() {
  const links = [
    {
      id: 1,
      alias: "portfolio",
      url: "https://portfolio.com",
      clicks: 52,
    },
    {
      id: 2,
      alias: "resume",
      url: "https://resume.com",
      clicks: 18,
    },
    {
      id: 3,
      alias: "github",
      url: "https://github.com",
      clicks: 9,
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Recent Links
        </h2>

        <button className="text-blue-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 hover:bg-slate-50 transition"
          >

            <div>
              <h3 className="font-semibold text-lg">
                {link.alias}
              </h3>

              <p className="text-slate-500 text-sm">
                {link.url}
              </p>
            </div>

            <div className="flex items-center gap-6">

              <div className="text-center">
                <p className="text-2xl font-bold">
                  {link.clicks}
                </p>

                <p className="text-xs text-slate-500">
                  Clicks
                </p>
              </div>

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <Copy size={18} />
              </button>

              <button className="rounded-xl p-3 hover:bg-slate-100">
                <ExternalLink size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default RecentLinks;