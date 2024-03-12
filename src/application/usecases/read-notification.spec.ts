import { makeNotification } from '@test/factories/make-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read notification', async () => {
    const notification = makeNotification();
    const notificationsRepository = new InMemoryNotificationsRepository();
    await notificationsRepository.create(notification);
    const sut = new ReadNotification(notificationsRepository);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non exist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new ReadNotification(notificationsRepository);

    expect(async () => {
      await sut.execute({
        notificationId: 'unexist notification id',
      });
    }).rejects.toThrow();
  });
});
