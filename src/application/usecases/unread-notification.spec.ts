import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread notification', async () => {
    const notification = makeNotification();
    const notificationsRepository = new InMemoryNotificationsRepository();
    await notificationsRepository.create(notification);
    const sut = new UnreadNotification(notificationsRepository);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new UnreadNotification(notificationsRepository);

    expect(async () => {
      await sut.execute({
        notificationId: 'unexist notification id',
      });
    }).rejects.toThrow();
  });
});
