import React, { useState, useEffect } from "react";
import { HiLogout, HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { HiCalendarDays, HiUserCircle } from "react-icons/hi2";
import { BiSolidAddToQueue } from "react-icons/bi";

const Sidebar = ({ userData }) => {
  const [open, setOpen] = useState(true);
  const { width } = useScreenSize();
  const profile = userData?.profile;

  const menus = [
    {
      name: "Eventos",
      link: "/dashboard",
      icon: HiCalendarDays,
      margin: true,
    },
    {
      name: "Crear evento",
      link: "/dashboard/create",
      icon: BiSolidAddToQueue,
    },
    {
      name: "Perfil",
      link: "/dashboard/profile",
      icon: HiUserCircle,
    },
    {
      name: "Salir",
      link: "/dashboard/logout",
      icon: HiLogout,
      margin: true,
    },
  ];

  useEffect(() => {
    if (width < 900) {
      setOpen(false);
    } else setOpen(true);
  }, [width]);

  return (
    <>
      <section className="flex gap-6">
        <div
          className={`bg-primary min-h-screen shadow-lg ${
            open ? "w-64" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              title={`${open ? "Cerrar menu" : "Abrir menu"}`}
              className="cursor-pointer hover:bg-secondary transition-colors hover:text-white rounded-md"
              onClick={() => setOpen(!open)}
            />
          </div>
          <Link
            to={"/dashboard/profile"}
            className="py-2 flex flex-col items-center cursor-pointer"
          >
            <img
              className={`${
                open ? "w-40 h-40" : "w-9 h-9"
              } aspect-auto rounded-full`}
              src={
                profile?.photo != null
                  ? profile?.photo
                  : "https://picsum.photos/200/300"
              }
              alt="Foto de perfil"
            />
            <h1
              className={`${
                open ? "text-xl text-center font-bold mt-3" : "hidden"
              }`}
            >
              {profile?.name} {profile?.surname}
            </h1>
          </Link>
          <hr className="border-gray-500 my-2" />
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-secondary transition-colors rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
