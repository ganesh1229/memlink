import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/public/Home";
import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard/Dashboard";
import Create from "../pages/dashboard/Create";
import Links from "../pages/dashboard/Links";
import Analytics from "../pages/dashboard/Analytics";
import Profile from "../pages/dashboard/Profile";
import NotFound from "../pages/public/NotFound";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import RedirectHandler from "../pages/public/RedirectHandler";
import PasswordProtected from "../pages/public/PasswordProtected";

function AppRoutes() {
  const { auth, initializing } = useAuth();

  if (initializing) {
    return null;
  }
  return (

    <Routes>
      <Route
        path="/"
        element={
          auth.accessToken ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Home />
          )
        }
      />

      <Route path="/auth" element={<Auth />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="create"
          element={<Create />}
        />

        <Route
          path="links"
          element={<Links />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>

      <Route
        path="/password/:alias"
        element={<PasswordProtected />}
      />

      <Route
        path="/:alias"
        element={<RedirectHandler />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;