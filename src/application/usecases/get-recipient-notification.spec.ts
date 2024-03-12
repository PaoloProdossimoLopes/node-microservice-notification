import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { randomUUID } from 'crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to count recipient notification', async () => {
    const recipientId = randomUUID();
    const notification1 = makeNotification({ recipientId });
    const notification2 = makeNotification({ recipientId });
    const notificationsRepository = new InMemoryNotificationsRepository();
    await notificationsRepository.create(notification1);
    await notificationsRepository.create(makeNotification());
    await notificationsRepository.create(notification2);
    const sut = new GetRecipientNotifications(notificationsRepository);

    const { notifications } = await sut.execute({
      recipientId,
    });

    expect(notifications).toEqual([notification1, notification2]);
  });
});
