import { useState } from "react";

import {
  createLink,
  getLinks,
  generateQRCode,
} from "../../../services/link.service";

function LinkForm({ mode,setResult, setLatestLinks,}) {
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

  const [loading, setLoading] =
  useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const payload = {originalUrl: formData.originalUrl,};

    if (formData.alias.trim()) {
    payload.alias = formData.alias.trim();
    }

    if (formData.password.trim()) {
    payload.password = formData.password.trim();
    }

    if (formData.expiresAt) {
    payload.expiresAt = new Date(formData.expiresAt).toISOString();
    }

    const response = await createLink(payload);

    let result = response.data;

    if (mode === "qr") {
      const qr =
        await generateQRCode(
          response.data.id
        );

      result = {
        ...result,
        qrCode: qr.data.qrCode,
      };
    }

    setResult(result);

    const latest =
      await getLinks();

    setLatestLinks(
      latest.data.slice(0, 5)
    );

    setFormData({
      originalUrl: "",
      alias: "",
      password: "",
      expiresAt: "",
    });

  } catch (err) {
    console.error(err);
    alert(
      err.response?.data?.message ??
        "Failed to create link"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-bold">
        {mode === "link"
          ? "Create Short Link"
          : "Generate QR Code"}
      </h2>

      <div className="space-y-4">

        <div>
          <label className="mb-2 block font-medium">
            Original URL
          </label>

          <input
            type="url"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="h-10 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Custom Alias
          </label>

          <input
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            placeholder="my-link"
            className="h-10 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Optional"
              className="h-10 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Expiration
            </label>

            <input
              type="datetime-local"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className="h-10 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        <button
            disabled={loading}
            className="mt-2 h-10 w-full rounded-2xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
            {loading
                ? "Creating..."
                : mode === "link"
                ? "Create Link"
                : "Generate QR"}
        </button>

      </div>
    </form>
  );
}

export default LinkForm;