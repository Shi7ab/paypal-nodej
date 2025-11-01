const Notification = require('../models/Notification')
const Factory = require('./factory/factoryService')


class NotificatService {
  async createNotefcate(req,res){
      const {userId, type, IsRead, Message, createdAt} = req.body
      const factory = new Factory(Notification)
      const notification = await factory.create({userId, type, IsRead, Message, createdAt})
      try {
        if (notification) {
            return res.status(201).json({ message: " notfication sended successfully! " })
        } 
      } catch (err) {
        return res.status(500).json(err)
      }
  }

  async getNotification(req,res){
     const factory = new Factory(Notification)
     const {userId, type, IsRead, Message, createdAt} = req.body
     const notfication = await factory.findAll(userId, type, IsRead, Message, createdAt)
     if (notfication) {
       return  notfication
     }
  }      
}

module.exports = NotificatService