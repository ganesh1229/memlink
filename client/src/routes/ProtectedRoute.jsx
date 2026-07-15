import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { auth, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!auth.accessToken) {
    return (
      <Navigate
        to="/auth?mode=login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;