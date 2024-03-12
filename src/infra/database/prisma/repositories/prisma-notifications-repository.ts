import { Content } from '@application/entities/content';
import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repository/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification) {
    const data = PrismaNotificationMapper.map(notification);
    await this.prismaService.notification.create({ data });
  }

  async findById(notificationId: string) {
    // const notification = await this.prismaService.notification.findUnique({
    //   where: {
    //     id: notificationId,
    //   },
    // });
    // if (!notification) return null;

    return new Notification({
      content: new Content('sdfsfdsfsd'),
      category: '',
      recipientId: notificationId,
    });
  }

  async update(notification: Notification) {
    const data = PrismaNotificationMapper.map(notification);
    await this.prismaService.notification.update({
      where: { id: notification.id },
      data,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });
    return notifications.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const {} = recipientId;
    return [];
  }
}
