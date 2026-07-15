import { CheckCircle, Copy, ExternalLink, Download } from "lucide-react";

function CreateResult({
  result,
  activeTab,
  onReset,
}) {
  if (!result) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      alert("Link copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Success */}

      <div className="flex items-center gap-3">

        <CheckCircle
          size={28}
          className="text-green-500"
        />

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {activeTab === "link"
              ? "Link Created"
              : "QR Code Generated"}
          </h3>

          <p className="text-sm text-slate-500">
            Your content is ready to share.
          </p>
        </div>

      </div>

      {/* Short URL */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Short URL
        </label>

        <div className="flex overflow-hidden rounded-2xl border border-slate-300">

          <input
            readOnly
            value={result.shortUrl}
            className="flex-1 bg-slate-50 px-4 py-4 outline-none"
          />

          <button
            onClick={copyLink}
            className="flex items-center gap-2 border-l border-slate-300 px-5 transition hover:bg-slate-100"
          >
            <Copy size={18} />

            Copy
          </button>

        </div>

      </div>

      {/* QR Preview */}

      {activeTab === "qr" && result.qrCode && (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <img
            src={result.qrCode}
            alt="QR Code"
            className="mx-auto h-52 w-52 rounded-xl"
          />

          <button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
          >
            <Download size={18} />

            Download QR
          </button>

        </div>

      )}

      {/* Actions */}

      <div className="flex gap-4">

        <a
          href={result.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
        >
          <ExternalLink size={18} />

          Open
        </a>

        <button
          onClick={onReset}
          className="flex-1 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Another
        </button>

      </div>

    </div>
  );
}

export default CreateResult;