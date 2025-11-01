const Payment = require('../models/Payment')
const Transaction = require('../models/transaction')
const Factory = require('./factory/factoryService')



class PayService {
  /*constructor(){
    const pay = new Payment()
  }*/

 async createPayment(req,res){
         const factory = new Factory(Payment)

         const { id , svv ,status, Amount, creditNumber } = req.body
         const payment = await new factory.create(id , svv , Amount, creditNumber)
         await payment.save()

         const transactionfatc = new Factory(Transaction)
         const transaction = await new transactionfatc.create({ paymentId, type, status, description, timestamp })
         await transaction.save()

         if (payment && transaction) {
           
           return res.status(201).json({message: "successfull payment",data:{payment,transaction}})
         }
  }

 async getpaymMethod(req,res){
     const factory = new Factory(Payment)
     const pay = await new factory.findAll()
 
      if (pay) {  
        return res.status(200).json({message: "successfull"})
      }
  
  }

  async updateTransaction(req,res){
     const factory = new Factory(Transaction)
     const {paymentId,type} = req.body
     const pay = await new factory.update(paymentId,type)
     if (pay) {
        return req.json(" updated tranaction successfully !")
     }
  }

  async deleteTransaction(req,res){
     const factory = new Factory(Transaction)
     const {id} = req.body
     const pay = await new factory.delete(id)
     if (pay) {
        return req.json("deleted tranaction!")
     }
  }
  
}


module.exports = PayService