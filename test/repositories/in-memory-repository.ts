import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repository/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (ntf) => ntf.id === notificationId,
    );
    if (!notification) return null;
    return notification;
  }

  async update(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (ntf) => ntf.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
