export interface NotificationBodyDto {
  title: string
  body: string
}
export interface NotificationDto {
  notification: NotificationBodyDto
  token: string
}
