import { useState } from "react";
import {
  Link2,
  Globe,
  Lock,
  Calendar,
} from "lucide-react";

function CreateForm({
  activeTab,
  loading,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    originalUrl: "",
    alias: "",
    password: "",
    expiresAt: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Original URL */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Globe size={16} />
          Original URL
        </label>

        <input
          type="url"
          name="originalUrl"
          value={formData.originalUrl}
          onChange={handleChange}
          placeholder="https://example.com"
          required
          className="h-14 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all focus:border-blue-500"
        />
      </div>

      {/* Alias */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Link2 size={16} />
          Custom Alias
        </label>

        <input
          type="text"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
          placeholder="summer-sale"
          className="h-14 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all focus:border-blue-500"
        />
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Lock size={16} />
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Optional"
          className="h-14 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all focus:border-blue-500"
        />
      </div>

      {/* Expiration */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Calendar size={16} />
          Expiration
        </label>

        <input
          type="date"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
          className="h-14 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all focus:border-blue-500"
        />
      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 h-14 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {loading
          ? activeTab === "link"
            ? "Creating..."
            : "Generating..."
          : activeTab === "link"
          ? "Create Link"
          : "Generate QR"}
      </button>
    </form>
  );
}

export default CreateForm;