import {
  CheckCircle,
  Copy,
  ExternalLink,
  Download,
  Check,
} from "lucide-react";
import { useState } from "react";

function CreateResult({ result, onReset }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        result.shortUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!result.qrCode) return;

    const link = document.createElement("a");

    link.href = result.qrCode;

    link.download = "memlink-qr.png";

    link.click();
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <CheckCircle
          size={28}
          className="text-green-500"
        />

        <div>

          <h3 className="text-lg font-semibold">

            Success!

          </h3>

          <p className="text-sm text-slate-500">

            Your short link is ready.

          </p>

        </div>

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold">

          Short URL

        </label>

        <div className="flex overflow-hidden rounded-2xl border">

          <input
            readOnly
            value={result.shortUrl}
            className="flex-1 bg-slate-50 px-4 py-4 outline-none"
          />

          <button
            onClick={copyLink}
            className="flex items-center gap-2 border-l px-5 hover:bg-slate-100"
          >

            {copied ? (
              <>
                <Check size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}

          </button>

        </div>

      </div>

      {result.qrCode && (

        <div className="rounded-2xl border bg-white p-6">

          <img
            src={result.qrCode}
            alt="QR Code"
            className="mx-auto h-52 w-52"
          />

          <button
            onClick={downloadQR}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold hover:bg-slate-100"
          >

            <Download size={18} />

            Download QR

          </button>

        </div>

      )}

      <div className="flex gap-4">

        <a
          href={result.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 font-semibold hover:bg-slate-100"
        >

          <ExternalLink size={18} />

          Visit

        </a>

        <button
          onClick={onReset}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >

          Create Another

        </button>

      </div>

    </div>
  );
}

export default CreateResult;