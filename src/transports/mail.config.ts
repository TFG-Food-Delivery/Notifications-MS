import { MailerModule } from '@nestjs-modules/mailer';
import { envs } from 'src/notifications/config';

export const MailTransporter = MailerModule.forRoot({
  transport: {
    host: envs.emailHost,
    port: 587,
    auth: {
      user: envs.emailUsername,
      pass: envs.emailPassword,
    },
  },
});
