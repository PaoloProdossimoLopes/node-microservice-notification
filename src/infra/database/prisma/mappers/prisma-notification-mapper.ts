import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static map(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }
}
