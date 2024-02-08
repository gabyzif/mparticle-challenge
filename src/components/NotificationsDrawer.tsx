import React, { useEffect } from "react";
import { useNotificationsStore } from "@/store/useNotificationsStore";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { Notification } from "@/types";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const orgId = "123";

  const notifications = useNotificationsStore((state) =>
    state.notifications.filter((n) => !n.read),
  );
  const markNotificationAsRead = (id:string) =>
    useNotificationsStore.getState().markNotificationAsRead(orgId, id);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest("#notifications-drawer"))
        onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      useNotificationsStore.getState().fetchNotifications(orgId);
    } else return () => {};
  }, [isOpen, orgId]);

  if (!isOpen) return null;

  const severityIcons: { [key in Notification["severity"]]: string } = {
    info: "ℹ️",
    warning: "⚠️",
    critical: "🚨",
  };

  const getSeverityIcon = (severity: Notification["severity"]) =>
    severityIcons[severity] || "ℹ️";

  const handleNotificationClick = async (id: string) => {
    await markNotificationAsRead(id);
    router.push(`/?metricUrl=${id}`);
  };

  const handleMarkAllAsRead = () => {
    useNotificationsStore.getState().markAllAsRead(orgId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      id="notifications-drawer"
    >
      <div
        className="w-full h-full bg-neutral-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-full max-w-md p-4 bg-neutral-800 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={onClose}
            className="font-bold rounded-full px-[10px] py-[4px] border-neutral-500 border hover:bg-neutral-700"
          >
            ✕
          </button>
        </div>
        {notifications.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto">
            {notifications.map((notification: Notification) => (
              <li
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className="cursor-pointer mt-4 hover:opacity-60"
              >
                <div className="flex ">
                  <p className="p-2">
                    {getSeverityIcon(notification.severity)}
                  </p>
                  <div className="ml-2">
                    <p>{notification.title}</p>
                    <ReactMarkdown className="text-sm">
                      {notification.description}
                    </ReactMarkdown>
                    <button
                      className="text-[#8589ff] hover:underline text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationClick(notification.id);
                      }}
                    >
                      View Metric
                    </button>
                  </div>

                  {!notification.read && (
                    <span className="ml-auto bg-yellow-00 text-neutral-100 font-mono  px-2 py-1">
                      New
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-1 bg-[#8589ff] rounded-full  hover:opacity-90"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDrawer;
