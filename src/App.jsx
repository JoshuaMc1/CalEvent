import { QueryClient, QueryClientProvider } from "react-query";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import LayoutI from "./components/LayoutI";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import { useState, useEffect } from "react";
import { user } from "./services/user";
import useGetToken from "./hooks/useGetToken";
import { isTrue, isUndefined } from "./utils/utils";
import Register from "./pages/Register";
import Home from "./pages/dashboard/Home";
import Create, { loader as CreateLoader } from "./pages/dashboard/Create";
import Profile from "./pages/dashboard/Profile";
import ErrorPage from "./pages/ErrorPage";
import Error404 from "./pages/Error404";
import { logout } from "./services/auth";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const queryClient = new QueryClient();
  const [token, setToken] = useState(useGetToken());
  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(true);

  const addToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem(
      import.meta.env.VITE_TOKEN_NAME,
      JSON.stringify(newToken)
    );
  };

  const handleUnauthorized = () => {
    localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, null);
    setToken(null);
    window.location = "/";
    console.clear();
  };

  useEffect(() => {
    const handleLoadDataUser = async () => {
      if (isTrue(token)) {
        const response = await user(token);

        if (isUndefined(response)) {
          handleUnauthorized();
        }

        if (response.success) {
          setUserData(response.data);
        } else {
          handleUnauthorized();
        }
      }
    };

    if (load) {
      handleLoadDataUser();
      setLoad(false);
    }
  }, [load, token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutI
          addToken={addToken}
          token={token}
          userData={userData}
          setLoad={setLoad}
        />
      ),
      children: [
        {
          index: true,
          element: <Index />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/register",
          element: <Register />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/*",
          element: <Error404 />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute
          isAllowed={!!token}
          redirectTo="/"
          unauthorized={handleUnauthorized}
        >
          <Layout
            addToken={addToken}
            token={token}
            userData={userData}
            setLoad={setLoad}
          />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/create",
          element: <Create />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/edit/:slug",
          element: <Create />,
          loader: CreateLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/logout",
          loader: async () => {
            const response = await logout(token);

            if (response.success) {
              localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, null);
              setToken(null);
              setUserData(null);
            }

            return redirect("/");
          },
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/*",
          element: <Error404 />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
