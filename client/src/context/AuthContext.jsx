import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
} from "../services/auth.service";

import { setAuthToken } from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
  });

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] =
    useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response =
          await refreshAccessToken();

        setAuth({
          user: response.data.user,
          accessToken:
            response.data.accessToken,
        });

        // Set Authorization header
        setAuthToken(
          response.data.accessToken
        );
      } catch (err) {
        console.log("No active session");
      } finally {
        setInitializing(false);
      }
    };

    initialize();
  }, []);

  const login = async (
    email,
    password
  ) => {
    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      setAuth({
        user: response.data.user,
        accessToken:
          response.data.accessToken,
      });

      // Set Authorization header
      setAuthToken(
        response.data.accessToken
      );

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email,
    password
  ) => {
    setLoading(true);

    try {
      const response =
        await registerUser({
          email,
          password,
        });

      setAuth({
        user: response.data.user,
        accessToken:
          response.data.accessToken,
      });

      // Set Authorization header
      setAuthToken(
        response.data.accessToken
      );

      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      // Remove Authorization header
      setAuthToken(null);

      setAuth({
        user: null,
        accessToken: null,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        initializing,
        login,
        register,
        logout,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}