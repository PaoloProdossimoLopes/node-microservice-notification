import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { CountRecipientNotifications } from './count-notifications';

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notification', async () => {
    const notification = makeNotification();
    const notificationsRepository = new InMemoryNotificationsRepository();
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    const sut = new CountRecipientNotifications(notificationsRepository);

    const { count } = await sut.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toEqual(3);
  });
});
