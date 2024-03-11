import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export abstract class CreateNotificationBody {
  @IsUUID()
  @IsNotEmpty()
  abstract recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  abstract content: string;

  @IsNotEmpty()
  abstract category: string;
}
