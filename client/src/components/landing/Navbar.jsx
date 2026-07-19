import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { auth, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-slate-200 bg-white/90 px-8 py-4 shadow-lg backdrop-blur-md">

        {/* Logo */}

        <a
          href="#hero"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
            M
          </div>

          <span className="text-2xl font-bold text-slate-900">
            MemLink
          </span>
        </a>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#hero"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Product
          </a>

          <a
            href="#features"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#faq"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            FAQ
          </a>
        </nav>

        {/* Right */}

        <div className="hidden items-center gap-6 md:flex">

          {auth.user ? (
            <>
              <span className="font-medium text-slate-700">
                {auth.user.email.split("@")[0]}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="font-medium text-slate-600 transition hover:text-slate-900"
              >
                Login
              </Link>

              <Link
                to="/auth?mode=register"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;