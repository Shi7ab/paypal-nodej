// Payment.js
class Payment {
  constructor({ id , svv , Amount, creditNumber}) {
    this.svv = svv;
    this.creditNumber = creditNumber;
    this.Amount = Amount
    this.id = id
  }
}

module.exports = Payment;
