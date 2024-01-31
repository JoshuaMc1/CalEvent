import { Outlet } from "react-router-dom";

const LayoutI = ({ addToken, token, userData, setLoad }) => {
  return (
    <main className="container w-screen h-screen">
      <Outlet
        context={{
          token,
          addToken,
          userData,
          setLoad,
        }}
      />
    </main>
  );
};

export default LayoutI;
