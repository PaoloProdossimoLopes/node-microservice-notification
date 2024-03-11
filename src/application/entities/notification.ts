import { Replace } from 'src/helpers/replace';
import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  createdAt: Date;
  readAt?: Date | null;
}

export class Notification {
  private readonly props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
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

  get readAt() {
    return this.props.readAt;
  }

  set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }
}
