import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repository/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification =
      await this.notificationsRepository.findById(notificationId);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.update(notification);
  }
}
