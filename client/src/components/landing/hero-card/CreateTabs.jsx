import { Link2, QrCode } from "lucide-react";

function CreateTabs({ activeTab, setActiveTab }) {
  return (
    <div className="relative flex rounded-2xl bg-slate-100 p-1">

      {/* Sliding Background */}

      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-sm transition-all duration-300 ease-in-out ${
          activeTab === "link"
            ? "left-1"
            : "left-[calc(50%+2px)]"
        }`}
      />

      {/* Links */}

      <button
        type="button"
        onClick={() => setActiveTab("link")}
        className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors duration-300 ${
          activeTab === "link"
            ? "text-blue-600"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <Link2 size={18} />

        Links
      </button>

      {/* QR */}

      <button
        type="button"
        onClick={() => setActiveTab("qr")}
        className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors duration-300 ${
          activeTab === "qr"
            ? "text-blue-600"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <QrCode size={18} />

        QR Code
      </button>

    </div>
  );
}

export default CreateTabs;