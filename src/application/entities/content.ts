export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLenghValid = this.validateContentLenght(content);
    if (!isContentLenghValid) {
      throw new Error('content lenght error');
    }
    this.content = content;
  }

  get value() {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
