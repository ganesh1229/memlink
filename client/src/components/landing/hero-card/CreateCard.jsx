import { useState } from "react";

import CreateTabs from "./CreateTabs";
import CreateForm from "./CreateForm";
import CreateResult from "./CreateResult";
import toast from "react-hot-toast";
import { createLink } from "../../../services/link.service";

function CreateCard() {
  const [activeTab, setActiveTab] = useState("link");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const payload = {
        originalUrl: formData.originalUrl,
      };

      const response = await createLink(payload);

      setResult(response.data);
    } catch (err) {
      console.error(err);

      toast(
          "Failed to create link"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="border-b border-slate-200 px-8 pt-8 pb-6">

        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Try MemLink
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Create smarter links instantly
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Shorten links or generate QR codes in seconds.
        </p>

      </div>

      {/* Tabs */}

      <div className="px-8 pt-6">

        <CreateTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      </div>

      {/* Form */}

      <div className="px-8 py-8">

        <CreateForm
          activeTab={activeTab}
          loading={loading}
          onSubmit={handleSubmit}
        />

      </div>

      {/* Result */}

      {result && (

        <div className="border-t border-slate-200 bg-slate-50 px-8 py-6">

          <CreateResult
            result={result}
            activeTab={activeTab}
            onReset={handleReset}
          />

        </div>

      )}

    </div>
  );
}

export default CreateCard;