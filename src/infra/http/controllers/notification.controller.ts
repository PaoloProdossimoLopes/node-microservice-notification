import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('/notifications')
export class NotificationController {
  constructor(private readonly sendNotifications: SendNotification) {}
  @Post()
  async createNewNotification(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotifications.execute(body);
    return {
      notification: NotificationViewModel.map(notification),
    };
  }
}
