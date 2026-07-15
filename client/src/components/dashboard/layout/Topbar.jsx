import { useAuth } from "../../../context/AuthContext";

function Topbar() {
  const { auth } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-10">

      <div>

        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-slate-500">
          {auth.user?.email}
        </p>

      </div>

      <div className="rounded-2xl bg-blue-100 px-5 py-3 font-semibold text-blue-700">
        MemLink Dashboard
      </div>

    </header>
  );
}

export default Topbar;