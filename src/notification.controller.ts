import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { randomUUID } from 'crypto';
import { PrismaService } from './prisma.service';

class CreateNotificationBody {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}

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
