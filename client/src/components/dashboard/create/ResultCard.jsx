import {
  Copy,
  ExternalLink,
  Download,
  CheckCircle,
} from "lucide-react";

function ResultCard({ result }) {
  if (!result) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(result.shortUrl);
    alert("Copied!");
  };

  return (
    <div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <CheckCircle
          size={28}
          className="text-green-600"
        />

        <h2 className="text-2xl font-bold text-green-700">
          Link Created Successfully
        </h2>

      </div>

      <div className="space-y-5">

        <div>

          <p className="mb-2 text-sm font-medium text-slate-500">
            Short URL
          </p>

          <div className="flex items-center justify-between rounded-2xl border bg-white px-5 py-4">

            <span className="font-medium">
              {result.shortUrl}
            </span>

            <button
              onClick={copyLink}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <Copy size={20} />
            </button>

          </div>

        </div>

        {result.qrCode && (

          <div>

            <p className="mb-3 text-sm font-medium text-slate-500">
              QR Code
            </p>

            <img
              src={result.qrCode}
              alt="QR Code"
              className="h-48 w-48 rounded-2xl border bg-white p-3"
            />

          </div>

        )}

        <div className="flex gap-4">

          <a
            href={result.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ExternalLink size={18} />
            Open
          </a>

          {result.qrCode && (
            <a
              href={result.qrCode}
              download="memlink-qr.png"
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold transition hover:bg-slate-100"
            >
              <Download size={18} />
              Download QR
            </a>
          )}

        </div>

      </div>

    </div>
  );
}

export default ResultCard;