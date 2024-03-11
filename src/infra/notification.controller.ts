import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('/notifications')
export class NotificationController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  listAllNotifications() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async createNewNotification(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const newNotificationId = randomUUID();
    const newNotification = {
      id: newNotificationId,
      content,
      category,
      recipientId,
    };
    const createdNotification = await this.prismaService.notification.create({
      data: newNotification,
    });
    return createdNotification;
  }
}
