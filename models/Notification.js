//  Notification.js
class Notification {
  constructor({ userId, type, IsRead, Message, createdAt }) {
    this.userId = userId
    this.type = type
    this.IsRead = IsRead
    this.Message = Message
    this.createdAt = createdAt
  }
}

module.exports = Notification;
