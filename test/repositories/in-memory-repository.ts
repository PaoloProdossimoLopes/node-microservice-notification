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

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = this.notifications.filter(
      (ntf) => ntf.recipientId === recipientId,
    );
    return notifications.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((ntf) => ntf.recipientId === recipientId);
  }
}
