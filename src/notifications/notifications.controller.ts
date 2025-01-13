import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('order_paid')
  paidOrder(@Payload() paidOrder) {
    this.notificationsService.sendConfirmationMail(paidOrder);
  }

  @EventPattern('courier_assigned')
  courierAssigned(@Payload() orderData) {
    this.notificationsService.sendOrderIncomingEmail(orderData);
  }

  @EventPattern('order_delivered')
  order_delivered(@Payload() orderData) {
    this.notificationsService.sendOrderDeliveredEmail(orderData);
  }
}
