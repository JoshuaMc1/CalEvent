import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Badge } from "flowbite-react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { truncateDescription } from "../utils/utils";
import ViewEvent from "./ViewEvent";
import { Link, useOutletContext } from "react-router-dom";
import Confirmation from "./Confirmation";
import { deleteEvent } from "../services/event";

const Event = ({ event, optionsDisabled = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openViewEvent, setOpenViewEvent] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const { token } = useOutletContext();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleViewEvent = () => {
    setOpenViewEvent(!openViewEvent);
    setMenuOpen(false);
  };

  const handleDeleteEvent = () => {
    setShowConfirmationDelete(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleDeleteEvent = async () => {
      const response = await deleteEvent(token, event?.slug);
      console.log(response);
    };

    if (deleteAction) {
      handleDeleteEvent();
    }
  }, [deleteAction, token, event?.slug]);

  const getBadgeProps = () => {
    event.priority = Number(event?.priority);

    switch (event.priority) {
      case 1:
        return { color: "red", icon: FcHighPriority, text: "Alta" };
      case 2:
        return { color: "yellow", icon: FcMediumPriority, text: "Media" };
      case 3:
        return { color: "green", icon: FcLowPriority, text: "Baja" };
      default:
        return { color: "indigo", icon: FcLowPriority, text: "Default" };
    }
  };

  const {
    color: badgeColor,
    icon: badgeIcon,
    text: badgeText,
  } = getBadgeProps();

  return (
    <div
      className={`w-full border border-green-700 rounded-lg shadow-lg ${event.color}`}
    >
      <ViewEvent
        event={event}
        setOpenModal={setOpenViewEvent}
        openModal={openViewEvent}
      />
      <div className="flex flex-row">
        <div className="p-4 flex w-full justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold" title={event?.title}>
              {truncateDescription(event?.title, 6)}
            </h2>
            <p className="text-sm text-gray-500">
              {event?.description !== null
                ? truncateDescription(event?.description, 15)
                : "El evento no tiene descripción."}
            </p>
            <div className="mt-6 flex">
              <Badge className="px-3 py-1" color={badgeColor} icon={badgeIcon}>
                <p>Prioridad {badgeText}</p>
              </Badge>
            </div>
          </div>
        </div>
        <div className="relative">
          {!optionsDisabled && (
            <div className="flex justify-end p-2">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleMenuToggle}
                type="button"
              >
                <HiDotsVertical size={20} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={handleViewEvent}
                        type="button"
                      >
                        Ver evento
                      </button>
                    </li>
                    <li>
                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        to={`/dashboard/edit/${event?.slug}`}
                      >
                        Editar
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={handleDeleteEvent}
                      >
                        Eliminar
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <Confirmation
          setShowConfirm={setShowConfirmationDelete}
          showConfirm={showConfirmationDelete}
          setDeletePost={setDeleteAction}
          message="¿Estás seguro de que deseas eliminar el evento?"
          optionYes="Si, deseo eliminar el evento!"
          optionNo="No, no quiero eliminar el evento."
        />
      </div>
    </div>
  );
};

export default Event;
