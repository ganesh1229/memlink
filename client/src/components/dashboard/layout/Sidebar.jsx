import {
  LayoutDashboard,
  PlusCircle,
  Link2,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create",
      path: "/dashboard/create",
      icon: PlusCircle,
    },
    {
      name: "Links",
      path: "/dashboard/links",
      icon: Link2,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b p-8">

        <h1 className="text-3xl font-bold text-blue-600">
          MemLink
        </h1>

      </div>

      <nav className="flex-1 px-5 py-8">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={22} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={22} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;