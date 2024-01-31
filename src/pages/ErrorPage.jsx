import { useRouteError, Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const location = useLocation();

  const getPath = () => {
    return location.pathname.split("/").length > 2
      ? location.pathname.split("/")[1]
      : location.pathname.split("/")[0];
  };

  return (
    <div className="grid h-full place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          ¡Vaya!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300">
          Lo sentimos, al parecer a ocurrido un error. Vuelve a intentarlo mas
          tarde.
        </p>
        <p className="mt-6 text-base leading-7 text-gray-300">
          {error.statusText || error.message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={`/${getPath()}`}
            className="text-white bg-secondary hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 ease-in-out"
          >
            Ir a inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
