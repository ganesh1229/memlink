import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Link2 size={30} className="text-slate-500" />
      </div>

      <h3 className="text-xl font-semibold">
        No links found
      </h3>

      <p className="mt-2 text-slate-500">
        Create your first short link to get started.
      </p>

      <Link
        to="/create"
        className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Create Link
      </Link>

    </div>
  );
}

export default EmptyState;