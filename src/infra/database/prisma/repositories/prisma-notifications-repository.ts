import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repository/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification) {
    const data = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({ data });
  }

  async findById(id: string) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });
    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async update(notification: Notification) {
    const data = PrismaNotificationMapper.toPrisma(notification);
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
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
