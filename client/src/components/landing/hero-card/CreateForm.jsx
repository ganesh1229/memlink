import { useState } from "react";
import { Globe } from "lucide-react";

function CreateForm({
  activeTab,
  loading,
  onSubmit,
}) {
  const [originalUrl, setOriginalUrl] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      originalUrl,
    });

    setOriginalUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Globe size={16} />

          Original URL
        </label>

        <input
          type="url"
          required
          value={originalUrl}
          onChange={(e) =>
            setOriginalUrl(
              e.target.value
            )
          }
          placeholder="https://example.com"
          className="h-14 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-14 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? activeTab === "link"
            ? "Creating..."
            : "Generating..."
          : activeTab === "link"
          ? "Create Link"
          : "Generate QR Code"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Want custom aliases, password protection and expiration?
        <span className="ml-1 font-medium text-blue-600">
          Sign in to unlock advanced features.
        </span>
      </p>
    </form>
  );
}

export default CreateForm;