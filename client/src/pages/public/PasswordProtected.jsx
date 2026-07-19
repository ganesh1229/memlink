import { useState } from "react";
import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { unlockLink } from "../../services/link.service";

function PasswordProtected() {
  const { alias } = useParams();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleUnlock = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await unlockLink(alias, password);
      console.log("Stored unlock token:", unlockToken);

      window.location.href =
        `https://memlink-backend.onrender.com/${alias}`;
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");

      setError(
        err.response?.data?.message ??
          "Invalid password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8 flex justify-center">

          <div className="rounded-full bg-blue-100 p-4">

            <Lock className="text-blue-600" />

          </div>

        </div>

        <h1 className="text-center text-2xl font-bold">

          Password Protected

        </h1>

        <p className="mt-2 text-center text-slate-500">

          Enter the password to access this link.

        </p>

        <form
          onSubmit={handleUnlock}
          className="mt-8 space-y-5"
        >

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-500"
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Unlocking..."
              : "Unlock"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default PasswordProtected;