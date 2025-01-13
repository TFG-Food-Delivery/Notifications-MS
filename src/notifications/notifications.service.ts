import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly LOGGER = new Logger('NotificationsService');
  constructor(private readonly mailService: MailerService) {}

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
                    <h1 style="margin: 0;">¡Tu pedido ha sido confirmado!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; font-size: 16px; line-height: 1.6;">
                    <p>Hola,</p>
                    <p>¡Tu pedido con <strong style="color: #7d53de;">${data.restaurantName}</strong> ha sido confirmado!</p>
                    <p>Estamos procesando tu pedido y pronto te notificaremos cuando esté listo para ser entregado.</p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; padding: 10px; background-color: #dbd8e2; border-radius: 6px;">
                      <tr>
                        <td><strong>ID del Pedido:</strong> ${data.id}</td>
                      </tr>
                      <tr>
                        <td><strong>Fecha:</strong> ${new Date(data.date).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Total:</strong> €${data.totalAmount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td><strong>Estado:</strong> ${data.status}</td>
                      </tr>
                      <tr>
                        <td><strong>Hora de Entrega Estimada:</strong> ${data.deliveryTime}</td>
                      </tr>
                      <tr>
                        <td><strong>Pago Realizado:</strong> ${data.paid ? 'Sí' : 'No'}</td>
                      </tr>
                    </table>

                    <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                    <p>Gracias por tu pedido y por elegirnos.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; text-align: center; font-size: 14px; color: #5c5c5c;">
                    <p>&copy; 2024 FoodToDoor. Todos los derechos reservados.</p>
                    <p><a href="https://www.foodtodoor.com" style="color: #7d53de; text-decoration: none;">Visita nuestro sitio web</a></p>
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
      subject: `Confirmación de Pedido #${data.id}`,
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
            Confirmación de Pedido #${data.order.id}
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="font-size: 16px; color: #333333;">Hola,</p>
            <p style="font-size: 16px; color: #333333;">Gracias por confiar en nosotros. Tu pedido ha sido procesado y está listo para ser entregado.</p>
            <p style="font-size: 16px; color: #333333;">Para confirmar la entrega, por favor proporciona el siguiente PIN al repartidor:</p>
            <h2 style="font-size: 36px; font-weight: bold; color: #4CAF50; text-align: center; margin: 20px 0;">${data.pin}</h2>
            <p style="font-size: 16px; color: #333333;">Este PIN es válido solo para este pedido y deberá ser introducido por el repartidor para completar la entrega.</p>
            <p style="font-size: 16px; color: #333333;">Si no has realizado este pedido o tienes alguna pregunta, por favor contacta con nuestro soporte al cliente lo antes posible.</p>
            <p style="font-size: 16px; color: #333333;">Gracias por elegir Food to Door.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f4f4f4; padding: 10px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="font-size: 14px; color: #666666;">Si no has realizado este pedido, por favor ignora este mensaje.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `¡Tu pedido está listo para la entrega! Usa este PIN para confirmar.`,
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
      <h2 style="text-align: center; color: #28a745;">¡Pedido entregado exitosamente!</h2>
      <p style="font-size: 16px;">Hola,</p>
      <p style="font-size: 16px;">Nos complace informarte que el pedido <strong>#${orderData.orderId}</strong> ha sido entregado correctamente.</p>
      <p style="font-size: 16px;">Gracias por confiar en nuestro servicio. Esperamos que hayas disfrutado de tu pedido.</p>
      <p style="font-size: 16px;">Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
      <p style="font-size: 16px; text-align: center; margin-top: 20px;">
        <a href="mailto:support@yourcompany.com" style="color: #007bff; text-decoration: none;">Contáctanos</a>
      </p>
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        Este correo fue enviado automáticamente. Si no reconoces este pedido, por favor comunícate con nosotros inmediatamente.
      </p>
    </div>
  `;

    this.mailService.sendMail({
      from: 'hello@demomailtrap.com',
      to: 'emanuel.cuevas03@gmail.com',
      subject: `¡Tu pedido ha sido entregado!`,
      html: message,
      headers: {
        'X-MT-Category': 'Order Confirmation',
      },
    });
    this.LOGGER.log(`Email sent to emanuelcuevas`);
  }
}
