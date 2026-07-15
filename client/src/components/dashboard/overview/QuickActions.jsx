import { Link2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="mt-8">
      <h2 className="mb-5 text-2xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Create Link */}

        <button
          onClick={() => navigate("/dashboard/create")}
          className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-600">
            <Link2
              size={28}
              className="text-blue-600 group-hover:text-white"
            />
          </div>

          <h3 className="text-2xl font-semibold text-slate-900">
            Create Short Link
          </h3>

          <p className="mt-3 text-slate-500">
            Shorten long URLs using memorable aliases.
          </p>
        </button>

        {/* QR Code */}

        <button
          onClick={() => navigate("/dashboard/create")}
          className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition group-hover:bg-green-600">
            <QrCode
              size={28}
              className="text-green-600 group-hover:text-white"
            />
          </div>

          <h3 className="text-2xl font-semibold text-slate-900">
            Generate QR Code
          </h3>

          <p className="mt-3 text-slate-500">
            Instantly create a QR code for your short link.
          </p>
        </button>

      </div>
    </section>
  );
}

export default QuickActions;