import { CancelNotification } from '@application/usecases/cancel-notification';
import { CountRecipientNotifications } from '@application/usecases/count-notifications';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('/notifications')
export class NotificationController {
  constructor(
    private readonly sendNotifications: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotifications,
    private readonly getRecipientNotification: GetRecipientNotifications,
  ) {}

  @HttpCode(201)
  @Post()
  async createNew(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotifications.execute(body);
    return {
      notification: NotificationViewModel.map(notification),
    };
  }

  @HttpCode(200)
  @Patch(':notificationId/cancel')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @HttpCode(200)
  @Get('to/:recipientId/count')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @HttpCode(200)
  @Get('to/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return { notifications: notifications.map(NotificationViewModel.map) };
  }

  @HttpCode(200)
  @Patch(':notificationId/read')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @HttpCode(200)
  @Patch(':notificationId/unread')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }
}
