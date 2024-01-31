import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ addToken, token, userData, setLoad }) => {
  return (
    <div className="flex">
      <Sidebar userData={userData} />
      <main className="w-full mx-3 md:mx-auto p-3">
        <Outlet
          context={{
            token,
            addToken,
            userData,
            setLoad,
          }}
        />
      </main>
    </div>
  );
};

export default Layout;
