import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  createdAt: Date;
  canceledAt?: Date;
  readAt?: Date | null;
}

export class Notification {
  private readonly _id: string;
  private readonly props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get content() {
    return this.props.content.value;
  }

  set content(content: string) {
    this.props.content = new Content(content);
  }

  get category() {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get canceledAt() {
    return this.props.canceledAt;
  }

  cancel() {
    this.props.canceledAt = new Date();
  }

  get readAt() {
    return this.props.readAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }
}
