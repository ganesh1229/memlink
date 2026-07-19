import {
  Copy,
  ExternalLink,
  QrCode,
} from "lucide-react";

import toast from "react-hot-toast";

function LinkActions({
  link,
  onShowQR,
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        link.shortUrl
      );
      toast.success("Link copied!");
    } catch {
      toast.success("Failed to copy Link");
    }
  };

  return (
    <div className="flex items-center gap-2">

      <button
        onClick={handleCopy}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
        title="Copy Link"
      >
        <Copy size={18} />
      </button>

      <a
        href={link.shortUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-green-600"
        title="Visit Link"
      >
        <ExternalLink size={18} />
      </a>

      <button
        onClick={() => onShowQR(link)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-purple-600"
        title="QR Code"
      >
        <QrCode size={18} />
      </button>

    </div>
  );
}

export default LinkActions;