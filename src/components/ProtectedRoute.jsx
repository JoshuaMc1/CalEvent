import { useState, useEffect, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { user } from "../services/user";
import Spinner from "./Spinner";
import useGetToken from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { isUndefined } from "../utils/utils";

const useAuth = (redirectTo = "/") => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const token = useGetToken();
  const navigate = useNavigate();

  const verifyToken = useCallback(async () => {
    try {
      const userData = await user(token);

      if (isUndefined(userData)) {
        navigate(redirectTo);
      }

      if (userData.success) {
        setAuthenticated(true);
      } else {
        navigate(redirectTo);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [token, navigate, redirectTo]);

  useEffect(() => {
    let timer = setTimeout(() => {
      verifyToken();
    }, 300);

    return () => clearTimeout(timer);
  }, [verifyToken]);

  return [loading, authenticated];
};

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const [loading, authenticated] = useAuth(redirectTo);

  if (loading) {
    return (
      <div className="h-screen">
        <Spinner text="Validando sesión..." />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
