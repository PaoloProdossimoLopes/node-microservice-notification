import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to creata a notification content', () => {
    const content = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
      createdAt: new Date(),
    });
    expect(content).toBeTruthy();
  });
});
