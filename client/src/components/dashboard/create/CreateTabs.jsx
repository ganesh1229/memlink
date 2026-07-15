import { Link2, QrCode } from "lucide-react";

function CreateTabs({ mode, setMode }) {
  return (
    <div className="mb-4 flex rounded-xl bg-slate-100 p-0.5">

      <button
        onClick={() => setMode("link")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition ${
          mode === "link"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <Link2 size={16} />
        Short Link
      </button>

      <button
        onClick={() => setMode("qr")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition ${
          mode === "qr"
            ? "bg-white text-green-600 shadow-sm"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <QrCode size={16} />
        QR Code
      </button>

    </div>
  );
}

export default CreateTabs;