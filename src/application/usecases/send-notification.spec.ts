import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sut = new SendNotification(notificationsRepository);
    const { notification } = await sut.execute({
      content: 'content for notification',
      category: 'category for notification',
      recipientId: 'target of notification',
    });
    expect(notificationsRepository.notifications).toEqual([notification]);
  });
});
