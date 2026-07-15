import {
  Download,
  Copy,
  X,
} from "lucide-react";

function QRModal({
  open,
  link,
  onClose,
}) {
  if (!open || !link) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      link.shortUrl
    );

    alert("Short URL copied!");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = link.qrCode;
    a.download = `${link.alias}-qr.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        <h2 className="text-center text-2xl font-bold">
          QR Code
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          Scan or download your QR code.
        </p>

        <div className="mt-8 flex justify-center">

          <img
            src={link.qrCode}
            alt="QR Code"
            className="h-64 w-64 rounded-xl border p-3"
          />

        </div>

        <p className="mt-6 truncate text-center text-sm text-blue-600">
          {link.shortUrl}
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 hover:bg-slate-200"
          >
            <Copy size={18} />
            Copy
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Download
          </button>

        </div>

      </div>

    </div>
  );
}

export default QRModal;