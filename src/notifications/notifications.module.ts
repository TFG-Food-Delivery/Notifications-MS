import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MailTransporter } from 'src/transports/mail.config';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [MailTransporter],
})
export class NotificationsModule {}
