import { useEffect, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { getRecentLinks } from "../../../services/dashboard.service";

function RecentLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await getRecentLinks();
      setLinks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading recent links...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Links
        </h2>

      </div>

      <div className="space-y-4">

        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
          >

            <div>

              <h3 className="font-semibold">
                {link.alias}
              </h3>

              <p className="text-sm text-slate-500">
                {link.shortUrl}
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  handleCopy(link.shortUrl)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <Copy size={18} />
              </button>

              <a
                href={link.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <ExternalLink size={18} />
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentLinks;