import { useState } from "react";
import { Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm({ switchMode }) {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="w-full max-w-md">

      <div className="mb-10">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
          <Link2 className="text-white" size={28} />
        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-3 text-slate-600">
          Sign in to continue to MemLink.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="h-14 w-full rounded-2xl border px-4"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="h-14 w-full rounded-2xl border px-4"
          />

        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-blue-600 text-white"
        >
          {loading
            ? "Signing In..."
            : "Login"}
        </button>

      </form>

      <p className="mt-8 text-center">

        Don't have an account?

        <button
          type="button"
          onClick={switchMode}
          className="ml-2 font-semibold text-blue-600"
        >
          Register
        </button>

      </p>

    </div>
  );
}

export default LoginForm;