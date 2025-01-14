import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly LOGGER = new Logger('NotificationsService');
  constructor(private readonly mailService: MailerService) {}

  sendRegistrationConfirmationMail(userRegisteredPayload: any) {
    // Estructura del mensaje HTML
    const message = `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #ffffff; color: #343434; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbd8e2; padding: 20px;">
              <tr>
                <td>
                  <table align="center" width="80%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                      <td style="background-color: #7d53de; color: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                        <h1 style="margin: 0;">Welcome to FoodToDoor!</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; font-size: 16px; line-height: 1.6;">
                        <p>Hello <strong style="color: #7d53de;">${userRegisteredPayload.name}</strong>,</p>
                        <p>Thank you for registering with <strong>FoodToDoor</strong>! We are excited to have you with us.</p>
                        <p>Here are some important details about your account:</p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; padding: 10px; background-color: #dbd8e2; border-radius: 6px;">
                          <tr>
                            <td><strong>ID:</strong> ${userRegisteredPayload.id}</td>
                          </tr>
                          <tr>
                            <td><strong>Name:</strong> ${userRegisteredPayload.name}</td>
                          </tr>
                          <tr>
                            <td><strong>Email:</strong> ${userRegisteredPayload.email}</td>
                          </tr>
                        </table>

                        <p>You can now explore the best food delivery options from the comfort of your home.</p>
                        <p>If you have any questions or need assistance, please feel free to contact us.</p>
                        <p>Thank you for joining FoodToDoor. We hope you enjoy your experience!</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; text-align: center; font-size: 14px; color: #5c5c5c;">
                        <p>&copy; 2024 FoodToDoor. All rights reserved.</p>
                        <p><a href="https://www.foodtodoor.com" style="color: #7d53de; text-decoration: none;">Visit our website</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>`;

    // Enviar el correo
    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `Welcome to FoodToDoor, ${userRegisteredPayload.name}!`,
      html: message,
      headers: {
        'X-MT-Category': 'Registration Confirmation',
      },
    });

    this.LOGGER.log(
      `Registration confirmation email sent to ${userRegisteredPayload.email}`,
    );
  }

  sendConfirmationMail(data: any): void {
    // Estructura del mensaje HTML
    const message = `
    <html>
  <body style="font-family: Arial, sans-serif; background-color: #ffffff; color: #343434; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbd8e2; padding: 20px;">
      <tr>
        <td>
          <table align="center" width="80%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #7d53de; color: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                <h1 style="margin: 0;">Your Order Has Been Confirmed!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; font-size: 16px; line-height: 1.6;">
                <p>Hello,</p>
                <p>Your order with <strong style="color: #7d53de;">${data.restaurantName}</strong> has been confirmed!</p>
                <p>We are processing your order and will notify you soon when it is ready for delivery.</p>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; padding: 10px; background-color: #dbd8e2; border-radius: 6px;">
                  <tr>
                    <td><strong>Order ID:</strong> ${data.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Date:</strong> ${new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Total:</strong> €${data.totalAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong> ${data.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Estimated Delivery Time:</strong> ${data.deliveryTime}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Completed:</strong> ${data.paid ? 'Yes' : 'No'}</td>
                  </tr>
                </table>

                <p>If you have any questions or need assistance, please do not hesitate to contact us.</p>
                <p>Thank you for your order and for choosing us.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; font-size: 14px; color: #5c5c5c;">
                <p>&copy; 2024 FoodToDoor. All rights reserved.</p>
                <p><a href="https://www.foodtodoor.com" style="color: #7d53de; text-decoration: none;">Visit our website</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `Order Confirmation #${data.id}`,
      html: message,
      headers: {
        'X-MT-Category': 'Order Confirmation',
      },
    });
    this.LOGGER.log(`Email sent to emanuelcuevas`);
  }

  sendOrderIncomingEmail(data: any) {
    const message = `
    <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ffffff; margin: 20px auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 600px;">
        <tr>
          <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white; font-size: 24px; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            Order Confirmation #${data.order.id}
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="font-size: 16px; color: #333333;">Hello,</p>
            <p style="font-size: 16px; color: #333333;">Thank you for trusting us. Your order has been processed and is ready for delivery.</p>
            <p style="font-size: 16px; color: #333333;">To confirm delivery, please provide the following PIN to the courier:</p>
            <h2 style="font-size: 36px; font-weight: bold; color: #4CAF50; text-align: center; margin: 20px 0;">${data.pin}</h2>
            <p style="font-size: 16px; color: #333333;">This PIN is valid only for this order and must be entered by the courier to complete the delivery.</p>
            <p style="font-size: 16px; color: #333333;">If you did not place this order or have any questions, please contact our customer support as soon as possible.</p>
            <p style="font-size: 16px; color: #333333;">Thank you for choosing Food to Door.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f4f4f4; padding: 10px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="font-size: 14px; color: #666666;">If you did not place this order, please ignore this message.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `¡Your order is ready for delivery! Use this PIN to confirm.`,
      html: message,
      headers: {
        'X-MT-Category': 'Order Confirmation',
      },
    });
    this.LOGGER.log(`Email sent to emanuelcuevas`);
  }

  sendOrderDeliveredEmail(orderData: any) {
    const message = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="text-align: center; color: #28a745;">Order Delivered Successfully!</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">We are pleased to inform you that the order <strong>#${orderData.orderId}</strong> has been successfully delivered.</p>
      <p style="font-size: 16px;">Thank you for trusting our service. We hope you enjoyed your order.</p>
      <p style="font-size: 16px;">If you have any questions or need assistance, please do not hesitate to contact us.</p>
      <p style="font-size: 16px; text-align: center; margin-top: 20px;">
        <a href="mailto:support@yourcompany.com" style="color: #007bff; text-decoration: none;">Contact Us</a>
      </p>
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        This email was sent automatically. If you do not recognize this order, please contact us immediately.
      </p>
    </div>
  `;

    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `¡Your order has been delivered!`,
      html: message,
      headers: {
        'X-MT-Category': 'Order Confirmation',
      },
    });
    this.LOGGER.log(`Email sent to emanuelcuevas`);
  }
}
