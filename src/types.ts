export interface Anomaly {
  id: string;
  orgId: string;
  timestamp: string;
  customerId: string;
  metric: string;
  value: number;
  read: boolean;
  severity: string;
  title: string;
  description: string;
}



export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  icon: string;
  metricUrl: string;
  severity: string;
}

export interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: (orgId: string) => Promise<void>;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (orgId: string, id: string) => void;
  markAllAsRead: (orgId: string) => void;
}
