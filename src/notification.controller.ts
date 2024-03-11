import { Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from './prisma.service';

@Controller('/notifications')
export class NotificationController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  listAllNotifications() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async createNewNotification() {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você tem uma nova solicitação de amizade',
        category: 'social',
        recipientId: randomUUID(),
      },
    });
  }
}
