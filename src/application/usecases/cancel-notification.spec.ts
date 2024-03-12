import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  it('should be able to cancel notification', async () => {
    const notification = makeNotification();
    const notificationsRepository = new InMemoryNotificationsRepository();
    await notificationsRepository.create(notification);
    const sut = new CancelNotification(notificationsRepository);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new CancelNotification(notificationsRepository);

    expect(async () => {
      await sut.execute({
        notificationId: 'unexist notification id',
      });
    }).rejects.toThrow();
  });
});
