import { Content } from '@application/entities/content';
import { Notification as DomainNotification } from '@application/entities/notification';
import { Notification as PrismaNotification } from 'prisma';

export class PrismaNotificationMapper {
  static toPrisma(domainNotification: DomainNotification) {
    return {
      id: domainNotification.id,
      content: domainNotification.content,
      category: domainNotification.category,
      recipientId: domainNotification.recipientId,
      createdAt: domainNotification.createdAt,
      readAt: domainNotification.readAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification) {
    return new DomainNotification(
      {
        category: prismaNotification.category,
        content: new Content(prismaNotification.content),
        recipientId: prismaNotification.recipientId,
        canceledAt: prismaNotification.canceledAt,
        readAt: prismaNotification.readAt,
        createdAt: prismaNotification.createdAt,
      },
      prismaNotification.id,
    );
  }
}
