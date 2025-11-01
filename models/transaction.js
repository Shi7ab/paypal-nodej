 class Transaction{
    constructor({ paymentId, type, status, description, timestamp  }) {
         this.paymentId = paymentId
         this.type = type
         this.status = status
         this.description = description
         this.timestamp = timestamp
        }
 }

module.exports = Transaction