import { useState } from "react";
import { Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RegisterForm({ switchMode }) {
  const { register, loading } =
    useAuth();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await register(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="w-full max-w-md">

      <div className="mb-10">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
          <Link2 className="text-white" size={28} />
        </div>

        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="h-14 w-full rounded-2xl border px-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="h-14 w-full rounded-2xl border px-4"
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-blue-600 text-white"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

      </form>

      <p className="mt-8 text-center">

        Already have an account?

        <button
          onClick={switchMode}
          className="ml-2 font-semibold text-blue-600"
        >
          Login
        </button>

      </p>

    </div>
  );
}

export default RegisterForm;