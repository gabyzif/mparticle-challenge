import { create } from "zustand";
import { NotificationsState } from "@/types";

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async (orgId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/anomaly-service/${orgId}/unread`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const notifications = await response.json();
      set({ notifications, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  markNotificationAsRead: async (orgId, id) => {
    try {
      const response = await fetch(
        `/api/anomaly-service/${orgId}/mark-read?messageId=${id}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      }));
    } catch (error) {
      console.error(error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  markAllAsRead: async (orgId) => {
    try {
      const response = await fetch(`/api/anomaly-service/${orgId}/mark-read`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }
      set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      }));
    } catch (error) {
      console.error(error);
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
}));
