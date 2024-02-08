// components/Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import NotificationsDrawer from "./NotificationsDrawer";
import { useNotificationsStore } from "@/store/useNotificationsStore";

const Header: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);

  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);
  const closeNotifications = () => setIsNotificationsOpen(false);

  const unreadCount = useNotificationsStore(
    (state) => state.notifications.filter((n) => !n.read).length,
  );

  return (
    <>
      <header className="  bg-neutral-900 py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <h1 className="text-white  font-bold">Mparticle Challenge</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={toggleNotifications}
                  className="relative text-white  hover:text-[#8589ff] focus:outline-none"
                >
                  Notifications
                  <span className="ml-2 absolute bottom-1 inline-flex items-center justify-center p-1 px-2 text-xs font-bold leading-none text-white  bg-[#8589ff] rounded-full">
                    {unreadCount}
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </>
  );
};

export default Header;
