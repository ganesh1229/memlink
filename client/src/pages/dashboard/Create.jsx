import { useState } from "react";

import CreateTabs from "../../components/dashboard/create/CreateTabs";
import LinkForm from "../../components/dashboard/create/LinkForm";
import ResultCard from "../../components/dashboard/create/ResultCard";
import LatestLinks from "../../components/dashboard/create/LatestLinks";

function Create() {
  const [mode, setMode] = useState("link");

  // Temporary result (will come from backend later)
  const [result, setResult] = useState(null);

  // Temporary latest links (will come from GET /links later)
  const [latestLinks, setLatestLinks] = useState([]);

  return (
    <div className="mx-auto max-w-2xl space-y-4">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Create
        </h1>

        <p className="mt-1 text-slate-500">
          Shorten URLs and generate QR codes.
        </p>
      </div>

      {/* Tabs */}
      <CreateTabs
        mode={mode}
        setMode={setMode}
      />

      {/* Form */}
      <LinkForm
        mode={mode}
        setResult={setResult}
        setLatestLinks={setLatestLinks}
      />

      {/* Generated Result */}
      <ResultCard result={result} />

      {/* Latest Links */}
      <LatestLinks links={latestLinks} />

    </div>
  );
}

export default Create;